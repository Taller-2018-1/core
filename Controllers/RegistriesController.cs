using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using think_agro_metrics.Data;
using think_agro_metrics.Models;

namespace think_agro_metrics.Controllers
{
    [Produces("application/json")]
    [Route("api/Registries")]
    public class RegistriesController : Controller
    {
        private readonly DataContext _context;

        public RegistriesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Registries
        [HttpGet]
        public IEnumerable<Registry> GetRegistries()
        {
            return _context.Registries;
        }

        // GET: api/Registries/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRegistry([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var registry = await _context.Registries.SingleOrDefaultAsync(m => m.RegistryID == id);

            if (registry == null)
            {
                return NotFound();
            }

            return Ok(registry);
        }

        // PUT: api/Registries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegistry([FromRoute] long id, [FromBody] Registry registry)
        {   
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != registry.RegistryID)
            {
                return BadRequest();
            }

            _context.Entry(registry).State = EntityState.Modified;
            //var registryDb = await _context.Registries.SingleOrDefaultAsync(r=> r.RegistryID == id);
            //return Ok();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Registries
        [HttpPost]
        public async Task<IActionResult> PostRegistry([FromBody] Registry registry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Registries.Add(registry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegistry", new { id = registry.RegistryID }, registry);
        }

        // DELETE: api/Registries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistry([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var registry = await _context.Registries.SingleOrDefaultAsync(m => m.RegistryID == id);
            if (registry == null)
            {
                return NotFound();
            }

            //var documents = _context.Documents.Where(d => d.RegistryID == id);
            var documents = registry.Documents;
            foreach (Document document in documents) // Remove documents from model
            {
                registry.Documents.Remove(document);
            }

            var docsDB = _context.Documents.Where(d => d.RegistryID == id);
            foreach (Document document in docsDB)  // Remove documents from database
            {
                _context.Documents.Remove(document);
            }

            _context.SaveChanges();

            _context.Registries.Remove(registry);
            await _context.SaveChangesAsync();

            return Ok(registry); // It works
        }

        private bool RegistryExists(long id)
        {
            return _context.Registries.Any(e => e.RegistryID == id);
        }
    }
}