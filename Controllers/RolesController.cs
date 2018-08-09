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

        // POST api/Roles/5/Permission/Read // To update or add permissions
        [HttpPost("{id}/Permissionn/Read")]
        public async Task<IActionResult> AddPermissionRead([FromRoute] long id, [FromBody] Indicator indicator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = await _context.Roles.SingleAsync(r => r.RoleID == id);

            if (role == null)
            {
                return NotFound();
            }

            role.PermissionsRead.Add(indicator);
            _context.Entry(role).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok(role);

        }

        // POST api/Roles/5/Permission/Read
        [HttpPut("{id}/Permission/Write")]
        public async Task<IActionResult> AddPermissionWrite([FromRoute] long id, [FromBody] Indicator indicator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var role = await _context.Roles.SingleAsync(r => r.RoleID == id);

            if (role == null)
            {
                return NotFound();
            }

            role.PermissionsWrite.Add(indicator);
            _context.Entry(role).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok(role);
        }
    }
}
