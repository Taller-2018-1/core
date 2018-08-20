using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using think_agro_metrics.Data;
using think_agro_metrics.Models;
using System.IO;
using System.Security.Cryptography;

namespace think_agro_metrics.Controllers
{
    [Produces("application/json")]
    [Route("api/auth")]
    public class AuthorizationController : Controller
    {
        private IConfiguration _config;
        private readonly DataContext _context;

        public class RefreshTokenQuery
        {
            public String refreshToken;
        }

        public class Role
        {
            public String role_id;
            public String role_name;
            public List<String> read;
            public List<String> write;
        }

        public AuthorizationController(IConfiguration config, DataContext context)
        {
            _context = context;
            _config = config;
        }


        public class Credentials
        {
            public String email;
            public String password;
        }

        public class AuthenticatedUser
        {
            public AuthenticatedUserResult Resultado;
            public Object Informacion;
        }

        public class AuthenticatedUserResult
        {
            public String UsuarioId;
            public DateTime FechaAutenticacion;
            public DateTime FechaExpiracion;
            public String Token;
            public String Id;
            public String NuevaSemilla;
            public String UltimaSemilla;
            public Boolean Eliminado;
        }

        public class UserDetails
        {
            public UserDetailsResult Resultado;
            public Object Informacion;
        }

        public class UserDetailsResult
        {
            public String NombreUsuario; //: "taller2018@utalca.cl",
            public String Password; //: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
            public String Nombre; //: "taller",
            public String Apellido; //: "2018",
            public String Email; //: "taller2018@utalca.cl",
            public DateTime FechaCreacion; //: "2018-05-30T17:35:05.112-04:00",
            public DateTime UltimaModificacion; //: "2018-06-05T17:29:30.436-04:00",
            public String[] Roles; //: [ "751381e9-91db-404c-94bb-dbb460551bda" ],
            public String UrlFoto; //: null,
            public Int16 Tipo; //: 0,
            public String Id; //: "e9d3208c-8714-4584-c11f-5a4a40710308",
            public String NuevaSemilla; //: "f0142fb1-add0-4c33-6804-78263302d6ff",
            public String UltimaSemilla; //: "030795ac-66ce-4605-5db9-ff16818562ab",
            public Boolean Eliminado; //: false
        }


        public class UserRole
        {
            public UserRoleResult Resultado;
            public Object Informacion;
        }


        public class UserRoleResult
        {
            public String Nombre; // : "Administrador",
            public String[] AccionesAutorizadas; // : [ "fafe970d-963f-41c4-ee3a-b7ec90ee0f19", "1dccffec-076d-446b-4921-cb9ca8945426"],
            public String Tipo; // : 0,
            public String Id; // : "1a568799-6a2e-453a-690d-0c2c1b8ff761",
            public String NuevaSemilla; // : "c4a9f2fa-ebe9-4d0a-3906-385ec270ef68",
            public String UltimaSemilla; // : "a8f479de-a17d-405c-e8b6-fc58e41baa13",
            public Boolean Eliminado; // : false
        }

        // This method consumes a token if it exists or if it is valid. Otherwise, it will return null,
        // meaning that this token is already consumed or it comes from a foreign IP

        private string GenerateRefreshTokenString()
        {
            var randomNumber = new byte[128];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private RefreshToken GenerateRefreshToken(AuthenticatedUser user){
            // Can't intercept due to https://github.com/dotnet/corefx/issues/11036
            // String clientIp = _accessor.HttpContext.Connection.RemoteIpAddress.ToString();
            RefreshToken refreshToken = new RefreshToken();
            refreshToken.ExpirationDate = DateTime.Now.AddDays(14); // RenewToken lasts 14 days
            // refreshToken.IP = clientIp;
            refreshToken.RefreshTokenString = this.GenerateRefreshTokenString();
            refreshToken.UID = user.Resultado.Id;
            _context.RefreshTokens.Add(refreshToken);
            return refreshToken;
        }

        [AllowAnonymous]
        [HttpPost("/renew")]
        private async Task<IActionResult> renewSession([FromBody] RefreshTokenQuery refreshTokenQuery)
        {
            try
            {
                // String clientIp = _accessor.HttpContext.Connection.RemoteIpAddress.ToString();
                RefreshToken retrievedToken = _context.RefreshTokens.Where(r_roken => r_roken.RefreshTokenString == refreshTokenQuery.refreshToken).First();// && token.IP == clientIp)
                if (retrievedToken == null)
                {
                    return Unauthorized(); // Nonexistant token
                }
                // else if (retrievedToken.IP != clientIp)
                // {
                //     _context.RefreshTokens.Remove(retrievedToken);
                //     return Unauthorized(); // Logged from a different IP
                // }
                else if (retrievedToken.ExpirationDate.CompareTo(DateTime.Now) < 0)
                {
                    _context.RefreshTokens.Remove(retrievedToken);
                    return Unauthorized(); // Token expired long ago :c
                }
                else
                {
                    AuthenticatedUser user = new AuthenticatedUser();
                    user.Resultado = new AuthenticatedUserResult();
                    user.Resultado.Id = retrievedToken.UID;
                    _context.RefreshTokens.Remove(retrievedToken);

                    UserDetails userDetails = await this.GetUserDetailsFromThinkagro(user);
                    if (userDetails == null)
                    {
                        return Unauthorized();
                    }

                    UserRole[] userRoles = await this.GetRolesPerUserFromThinkagro(userDetails);
                    if (userRoles == null)
                    {
                        return Unauthorized();
                    }

                    String token = this.BuildToken(user, userDetails, userRoles);

                    if (token == null)
                    {
                        return Unauthorized();
                    }
                    return Ok(new { token = token });
                }
            }
            catch (System.Exception)
            {
                return Unauthorized();
            }

        }
        private string BuildToken(AuthenticatedUser user, UserDetails userDetails, UserRole[] userRoles)
        {
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("id", userDetails.Resultado.Id));
            claims.Add(new Claim("email", userDetails.Resultado.Email));
            claims.Add(new Claim("first_name", userDetails.Resultado.Nombre));
            claims.Add(new Claim("username", userDetails.Resultado.NombreUsuario));
            claims.Add(new Claim("last_name", userDetails.Resultado.Apellido));
            if (userDetails.Resultado.UrlFoto != null)
            {
                claims.Add(new Claim("profile_picture", userDetails.Resultado.UrlFoto));
            }
            foreach (var userRole in userRoles)
            {
                // Used to return "administrad_ _indicadores" for "Administrador Indicadores", now it return "administrador_indicadores".
                claims.Add(new Claim(ClaimTypes.Role, string.Concat(userRole.Resultado.Nombre.Select((x, i) => i > 0 && char.IsWhiteSpace(x) ? "_" : x.ToString().ToLower()))));
                claims.Add(new Claim("role_ids", userRole.Resultado.Id));
                // came with this idea while listening https://www.youtube.com/watch?v=7PYe57MwxPI while drunk
                using (StreamReader r = new StreamReader("Data/permissions.json"))
                {
                    string json = r.ReadToEnd();
                    List<Role> roles = new List<Role>(JsonConvert.DeserializeObject<List<Role>>(json));
                    Role subject = roles.Find(role => role.role_id == userRole.Resultado.Id);
                    if (subject != null)
                    {
                        foreach (string permission in subject.write)
                        {
                            claims.Add(new Claim("writes", permission));
                        }
                        foreach (string permission in subject.read)
                        {
                            claims.Add(new Claim("reads", permission));
                        }
                    }

                }
            }
            RefreshToken refreshToken = this.GenerateRefreshToken(user);
            claims.Add(new Claim("refreshToken", refreshToken.RefreshTokenString));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims: claims.ToArray(),
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: creds);

            // TODO: Add refresh token entry
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public HttpClient _client = new HttpClient();
        private String ROLE_BY_ID_QUERY_URL = "http://proyectos.thinkagro.cl/API/api/Query/RolPorId";
        private String COMMAND_QUERY_URL = "http://proyectos.thinkagro.cl/API/api/Command/Enviar";
        private String GET_USER_DETAILS_QUERY_URL = "http://proyectos.thinkagro.cl/API/api/Query/UsuarioPorId";
        private String SESSION_BY_SEED_QUERY_URL = "http://proyectos.thinkagro.cl/API/api/Query/SesionPorSemilla";


        private Object CreateCommandObject(String context, String commandName, Object serialisedCommand)
        {
            return new
            {
                Contexto = "Usuarios",
                NombreComando = "IniciarSesion",
                ComandoSerializado =
                    new StringContent(JsonConvert.SerializeObject(serialisedCommand), Encoding.UTF8, "application/json")
                        .ReadAsStringAsync().Result
            };
        }

        private Object CreateDataObject(Object data)
        {
            return new
            {
                Datos = data
            };
        }

        private String GetHash(String randomString)
        {
            var crypt = new System.Security.Cryptography.SHA256Managed();
            var hash = new System.Text.StringBuilder();
            byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(randomString));
            foreach (byte theByte in crypto)
            {
                hash.Append(theByte.ToString("x2"));
            }
            return hash.ToString();
        }

        private async Task<AuthenticatedUser> LogInOntoThinkagro(Credentials credentials)
        {

            var seed = Guid.NewGuid();

            var payload = this.CreateCommandObject("Usuarios", "IniciarSesion",
                new
                {
                    NombreUsuario = credentials.email,
                    Password = this.GetHash(credentials.password),
                    Semilla = seed.ToString()
                }
            );
            var response = await _client.PostAsync(this.COMMAND_QUERY_URL,
                new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            String JSONResponse = await response.Content.ReadAsStringAsync();

            // This was a lie, in fact thinkagro can take up to 5 seconds when authorizing a user :c
            await Task.Delay(2000);

            payload = this.CreateDataObject(new { Semilla = seed.ToString() });
            response = await _client.PostAsync(this.SESSION_BY_SEED_QUERY_URL,
                new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
            JSONResponse = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            AuthenticatedUser user = JsonConvert.DeserializeObject<AuthenticatedUser>(JSONResponse);
            return user;
        }


        private async Task<UserDetails> GetUserDetailsFromThinkagro(AuthenticatedUser user)
        {
            var payload = this.CreateDataObject(new { Id = user.Resultado.UsuarioId });
            var response = await _client.PostAsync(this.GET_USER_DETAILS_QUERY_URL, new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
            String JSONResponse = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }
            return JsonConvert.DeserializeObject<UserDetails>(JSONResponse);
        }

        private async Task<UserRole[]> GetRolesPerUserFromThinkagro(UserDetails userDetails)
        {
            List<UserRole> roles = new List<UserRole>();

            IEnumerable<String> rolesQuery = from role in userDetails.Resultado.Roles select role;

            foreach (String role in rolesQuery)
            {
                var payload = this.CreateDataObject(new { Id = role });
                var response = await _client.PostAsync(this.ROLE_BY_ID_QUERY_URL,
                    new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
                String JSONResponse = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    return null;
                }
                UserRole userRole = JsonConvert.DeserializeObject<UserRole>(JSONResponse);
                roles.Add(userRole);
            }

            return roles.ToArray();
        }

        [AllowAnonymous]
        [HttpPost("")]
        public async Task<IActionResult> LogIn([FromBody] Credentials credentials)
        {
            try
            {
                AuthenticatedUser user = await this.LogInOntoThinkagro(credentials);
                if (user == null)
                {
                    return Unauthorized();
                }
                // At this point, the user is logged in, and it's information can be retrieved.

                UserDetails userDetails = await this.GetUserDetailsFromThinkagro(user);
                if (userDetails == null)
                {
                    return Unauthorized();
                }
                // Now, we get all the roles involved

                UserRole[] userRoles = await this.GetRolesPerUserFromThinkagro(userDetails);
                if (userRoles == null)
                {
                    return Unauthorized();
                }

                String token = this.BuildToken(user, userDetails, userRoles);

                if (token == null)
                {
                    return Unauthorized();
                }
                return Ok(new { token = token });
            }
            catch (System.Exception exception)
            {
                return Unauthorized();
            }

        }
    }
}