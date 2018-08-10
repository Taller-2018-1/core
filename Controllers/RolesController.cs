using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using think_agro_metrics.Data;
using think_agro_metrics.Models;

namespace think_agro_metrics.Controllers
{
    [Produces("application/json")]
    [Route("api/Roles")]
    public class RolesController : Controller
    {
        private readonly DataContext _context;


        public RolesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _context.Roles.ToListAsync();
            return Ok(roles);
        }

        // GET: api/Roles/Complete
        [HttpGet("Complete")]
        public async Task<IActionResult> GetRolesComplete()
        {
            var roles = await _context.Roles
                .Include(r => r.PermissionsRead)
                .Include(r => r.PermissionsWrite).ToListAsync();
            return Ok(roles);
        }

        // GET: api/Roles/751381e9-91db-404c-94bb-dbb460551bda
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoleByToken([FromRoute] string id)
        {

            var roleQuery = _context.Roles.Where(r => r.RoleToken == id);
            var role = await roleQuery
                .Include(r => r.PermissionsRead)
                .Include(r => r.PermissionsWrite).SingleAsync();

            if (role ==  null)
            {
                return NotFound();
            }

            return Ok(role);
        }

        // POST api/Roles/751381e9-91db-404c-94bb-dbb460551bda/Permission/Read // To update or add permissions
        [HttpPost("{id}/Permission/Read")]
        public async Task<IActionResult> AddPermissionRead([FromRoute] string id, [FromBody] Indicator indicator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = await _context.Roles.SingleAsync(r => r.RoleToken == id);

            if (role == null)
            {
                return NotFound();
            }

            Permission permission = new Permission { IndicatorID = indicator.IndicatorID};
            role.PermissionsRead.Add(permission);
            _context.Entry(role).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok(role);

        }

        // POST api/Roles/751381e9-91db-404c-94bb-dbb460551bda/Permission/Read
        [HttpPost("{id}/Permission/Write")]
        public async Task<IActionResult> AddPermissionWrite([FromRoute] string id, [FromBody] Indicator indicator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = await _context.Roles.SingleAsync(r => r.RoleToken == id);

            if (role == null)
            {
                return NotFound();
            }

            Permission permission = new Permission { IndicatorID = indicator.IndicatorID};
            role.PermissionsWrite.Add(permission);
            _context.Entry(role).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok(role);
        }
    }
}
