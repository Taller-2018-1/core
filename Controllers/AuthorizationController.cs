using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using think_agro_metrics.Data;
using think_agro_metrics.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace think_agro_metrics.Controllers
{
    
    
    
    
    [Produces("application/json")]
    [Route("api/auth")]
    public class AuthorizationController : Controller
    {
        public class Credentials
        {
            public String email;
            public String password;
        }
        
//        private string BuildToken(UserModel user)
//        {
//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
//
//            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
//                _config["Jwt:Issuer"],
//                expires: DateTime.Now.AddMinutes(30),
//                signingCredentials: creds);
//
//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }

        public HttpClient _client = new HttpClient();
        private String ROLES_QUERY_URL = "http://proyectos.thinkagro.cl/API/api/Query/Usuarios";
        
////        
////        {
////            "Resultado": {
////                "Resultados": [
////                {
////                    "NombreUsuario": "pmoller@thinkagro.cl",
////                    "Password": "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
////                    "Nombre": "Patricia Andrea",
////                    "Apellido": "Möller Acuña",
////                    "Email": "pmoller@thinkagro.cl",
////                    "FechaCreacion": "2018-05-17T16:33:25.875-04:00",
////                    "UltimaModificacion": "2018-05-17T16:33:25.875-04:00",
////                    "Roles": [],
////                    "UrlFoto": null,
////                    "Tipo": 0,
////                    "Id": "07ed2263-c4a0-43b2-96cd-8ba20f84b67f",
////                    "NuevaSemilla": "107c9f0d-9e3b-4e8b-d4ab-820fd213fde1",
////                    "UltimaSemilla": "107c9f0d-9e3b-4e8b-d4ab-820fd213fde1",
////                    "Eliminado": false
////                },
////        
//        private async Task<string> GetThinkAgroRoles(string id)
//        {
//            var payload = new {
//                Datos = new {
//                    Id = "debb43a0-dea7-491d-9cda-e9b46adb2604"
//                }
//            };
//            
//            var response = await _client.PostAsync(ROLES_QUERY_URL, new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json"));
//            if (response.IsSuccessStatusCode)
//            {
//                var JSONResponse = await response.Content.ReadAsStringAsync();
//
//                JSONResponse = @"{
//                ""Resultado"": {
//                    ""Resultados"": [
//                        {
//                            ""NombreUsuario"": ""pmoller@thinkagro.cl"",
//                            ""Password"": ""8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"",
//                            ""Nombre"": ""Patricia Andrea"",
//                            ""Apellido"": ""Möller Acuña"",
//                            ""Email"": ""pmoller@thinkagro.cl"",
//                            ""FechaCreacion"": ""2018-05-17T16:33:25.875-04:00"",
//                            ""UltimaModificacion"": ""2018-05-17T16:33:25.875-04:00"",
//                            ""Roles"": [],
//                            ""UrlFoto"": null,
//                            ""Tipo"": 0,
//                            ""Id"": ""07ed2263-c4a0-43b2-96cd-8ba20f84b67f"",
//                            ""NuevaSemilla"": ""107c9f0d-9e3b-4e8b-d4ab-820fd213fde1"",
//                            ""UltimaSemilla"": ""107c9f0d-9e3b-4e8b-d4ab-820fd213fde1"",
//                            ""Eliminado"": false
//                        }
//                    ]
//                }
//                ";
//                
//                JObject response_ = JObject.Parse(JSONResponse);
//
//                response_.SelectToken("$..Resultados[?(@NombreUsuario=='pmoller@thinkagro.cl')].Roles")
//                    .ToObject<string[]>();
//            }
//
//            return null;
//        }
//        
//        
//        // ADD LinkDocument: api/Registries/5/AddLinkDocument
//        [HttpPost("")]
//        public async Task<IActionResult> AddLinkDocument([FromRoute] long id, [FromBody] Document document)
//        {
//            var response = "";
//            
////                response = await client.GetStringAsync("https://siichile.herokuapp.com/consulta?rut=76.638.308-4");
//            response = await GetThinkAgroRoles("debb43a0-dea7-491d-9cda-e9b46adb2604");
////            }
////            catch (Exception)
////            {
////                return Unauthorized();
////            }
//            
//            
//            // The response object is a string that looks like this:
//            // "{ message: 'Hello world!' }"
//        
////            if (!ModelState.IsValid) {
////                return BadRequest(ModelState);
////            }
////
////            Registry registry = _context.Registries.First(i => i.RegistryID == id);
////            registry.Documents.Add(document);
////            _context.Entry(registry).State = EntityState.Modified;
////
////            try {
////                await _context.SaveChangesAsync();
////            }
////            catch (DbUpdateConcurrencyException){
////                if (!RegistryExists(id))
////                {
////                    return NotFound();
////                }
////                else
////                {
////                    throw;
////                }
////            }
//
//            return Ok(response);
//        }
//        
        
        [HttpPost("")]
        public async Task<IActionResult> LogIn([FromBody] Credentials credentials)
        {
            if (credentials.email == "taller2018@utalca.cl" && credentials.password == "password")
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}