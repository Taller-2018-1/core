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

       // ADD REGISTRY: api/Indicators/5/AddRegistry
        [HttpPost("{indicatorId}/DefaultRegistry")]
        public async Task<IActionResult> DefaultRegistry([FromRoute] long indicatorId,
            [FromBody] DefaultRegistry registry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Indicator indicator = _context.Indicators.First(i => i.IndicatorID == indicatorId);
            //Registry registry = new DefaultRegistry();
            //registry.Name = name;

            indicator.Registries.Add(registry);

            _context.Entry(indicator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndicatorExists(indicatorId))
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
         private bool IndicatorExists(long id)
        {
            return _context.Indicators.Any(e => e.IndicatorID == id);
        }
        // ADD REGISTRY: api/Indicators/5/AddRegistry
        [HttpPost("{indicatorId}/QuantityRegistry")]
        public async Task<IActionResult> QuantityRegistry([FromRoute] long indicatorId,
            [FromBody] QuantityRegistry registry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Indicator indicator = _context.Indicators.First(i => i.IndicatorID == indicatorId);
            //Registry registry = new DefaultRegistry();
            //registry.Name = name;

            indicator.Registries.Add(registry);

            _context.Entry(indicator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndicatorExists(indicatorId))
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

        // ADD REGISTRY: api/Indicators/5/AddRegistry
        [HttpPost("{indicatorId}/LinkRegistry")]
        public async Task<IActionResult> LinkRegistry([FromRoute] long indicatorId,
            [FromBody] LinkRegistry registry)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Indicator indicator = _context.Indicators.First(i => i.IndicatorID == indicatorId);
            //Registry registry = new DefaultRegistry();
            //registry.Name = name;

            indicator.Registries.Add(registry);

            _context.Entry(indicator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndicatorExists(indicatorId))
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

            _context.Registries.Remove(registry);
            await _context.SaveChangesAsync();

            return Ok(registry);
        }

        private bool RegistryExists(long id)
        {
            return _context.Registries.Any(e => e.RegistryID == id);
        }

        // ADD LinkDocument: api/Registries/5/AddLinkDocument
        [HttpPost("{id}/AddLinkDocument")]
        public async Task<IActionResult> AddLinkDocument([FromRoute] long id,
            [FromBody] Document document)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Registry registry = _context.Registries.First(i => i.RegistryID == id);

            registry.Documents.Add(document);

            _context.Entry(registry).State = EntityState.Modified;

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
    
    }
}