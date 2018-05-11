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

        // PUT: api/Registries/5/DefaultRegistry
        [HttpPut("{id}/DefaultRegistry")]
        public async Task<IActionResult> PutRegistry([FromRoute] long id, [FromBody] DefaultRegistry registry)
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
            return Ok();
            //return NoContent();
        }


        // PUT: api/Registries/5/QuantityRegistry
        [HttpPut("{id}/QuantityRegistry")]
        public async Task<IActionResult> PutRegistry([FromRoute] long id, [FromBody] QuantityRegistry registry)
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

            return Ok();
            //return NoContent();
        }

        // PUT: api/Registries/5/PercentRegistry
        [HttpPut("{id}/PercentRegistry")]
        public async Task<IActionResult> PutRegistry([FromRoute] long id, [FromBody] PercentRegistry registry)
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

            return Ok();
            //return NoContent();
        }

        // PUT: api/Registries/5/LinkRegistry
        [HttpPut("{id}/LinkRegistry")]
        public async Task<IActionResult> PutRegistry([FromRoute] long id, [FromBody] LinkRegistry registry)
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

            return Ok();
            //return NoContent();
        }

        // PUT: api/Registries/5/ActivityRegistry
        [HttpPut("{id}/ActivityRegistry")]
        public async Task<IActionResult> PutRegistry([FromRoute] long id, [FromBody] ActivityRegistry registry)
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

            return Ok();
            //return NoContent();
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

        // DELETE: api/Registries/Documents/5
        [HttpDelete("Documents/{id}")]
        public async Task<IActionResult> DeleteDocument([FromRoute] long id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var document = await _context.Documents.SingleOrDefaultAsync(d => d.DocumentID == id );
            
            if(document == null)
            {
                return NotFound();
            }
            
            // Every documents belongs to a Registry, it's not necessary to validate
            var registry = await _context.Registries.SingleOrDefaultAsync(r => r.RegistryID == document.RegistryID);

            registry.Documents.Remove(document); // Delete Document from model

            _context.Documents.Remove(document); // Delete Document from Database

            await _context.SaveChangesAsync();

            return Ok(document);

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