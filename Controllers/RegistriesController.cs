﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using think_agro_metrics.Data;
using think_agro_metrics.Models;
using System.Net.Http.Headers;
using System.IO;

namespace think_agro_metrics.Controllers
{
    [Produces("application/json")]
    [Route("api/Registries")]
    public class RegistriesController : Controller
    {
        private readonly DataContext _context;
        private IHostingEnvironment _hostingEnvironment;

        public RegistriesController(DataContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
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
            _context.Registries.Include(x => x.Documents).ToList();
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

        // ADD FileDocument: api/Registries/5/AddFileDocument
        [HttpPost("{id}/AddFileDocument"), DisableRequestSizeLimit]
        public ActionResult AddFileDocument([FromRoute] long id)
        {
            try
            {
                string name = "";
                string link = "";
                var file = Request.Form.Files[0];
                string folderName = "Repository";
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    name = fileName;
                    link = Path.Combine(folderName, fileName); //Reemplazar por un nombre pulento (con hash)
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }

                Registry registry = _context.Registries.First(i => i.RegistryID == id);
                Document document = new Document();
                document.Name = name;
                document.Link = link;
                document.Extension = "file";
                registry.Documents.Add(document);
                _context.Entry(registry).State = EntityState.Modified;
                _context.SaveChanges();

                return Json("Upload Successful.");
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
            /*
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
            */
        }
    }


}