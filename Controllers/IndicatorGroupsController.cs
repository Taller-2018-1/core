using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using think_agro_metrics.Data;
using think_agro_metrics.Models;
using Microsoft.AspNetCore.Authorization;

namespace think_agro_metrics.Controllers
{
    [Produces("application/json")]
    [Route("api/IndicatorGroups")]
    public class IndicatorGroupsController : Controller
    {
    
        private readonly DataContext _context;

        public IndicatorGroupsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/IndicatorGroups
        [HttpGet]
        [Authorize(Roles = "administrador_indicadores,gestor_contenido")]
        public async Task<IActionResult> GetIndicatorGroups()
        {
            var indicatorGroups = await _context.IndicatorGroups
                .Include(g => g.Indicators)
                .ThenInclude(i => i.Goals)
                .ToListAsync();

            return Ok(indicatorGroups);
        }

        // GET: api/IndicatorGroupsComplete
        [HttpGet("Complete")]
        public async Task<IActionResult> GetIndicatorGroupsComplete()
        {
            var indicatorGroups = await _context.IndicatorGroups
                .Include(g => g.Indicators)
                .ThenInclude(i => i.Registries)
                .Include(i => i.Indicators)
                .ThenInclude( i => i.Goals)
                .ToListAsync();

            return Ok(indicatorGroups);
        }

        // GET: api/IndicatorGroups/5
        [HttpGet("{id}")]
        [Authorize(Roles = "administrador_indicadores,gestor_contenido")]
        public async Task<IActionResult> GetIndicatorGroup([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var indicatorGroup = await _context.IndicatorGroups
                .Where(g => g.IndicatorGroupID == id)
                .Include(g => g.Indicators)
                .ThenInclude(i => i.Goals)
                .SingleAsync();            

            if (indicatorGroup == null)
            {
                return NotFound();
            }

            return Ok(indicatorGroup);
        }

        // GET: api/IndicatorsGroups/5/Name
        [HttpGet("{id}/Name")]
        [Authorize(Roles = "administrador_indicadores,gestor_contenido")]
        public async Task<IActionResult> GetIndicatorGroupName([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var indicatorGroup = await _context.IndicatorGroups.SingleOrDefaultAsync(x => x.IndicatorGroupID == id);

            if (indicatorGroup == null)
            {
                return NotFound();
            }

            return Ok(indicatorGroup.Name);
        }

        // PUT: api/IndicatorGroups/5
        [HttpPut("{id}")]
        [Authorize(Roles = "administrador_indicadores")]
        public async Task<IActionResult> PutIndicatorGroup([FromRoute] long id, [FromBody] IndicatorGroup indicatorGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != indicatorGroup.IndicatorGroupID)
            {
                return BadRequest();
            }

            _context.Entry(indicatorGroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndicatorGroupExists(id))
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
        
        // POST: api/IndicatorGroups
        [HttpPost]
        [Authorize(Roles = "administrador_indicadores")]
        public async Task<IActionResult> PostIndicatorGroup([FromBody] IndicatorGroup indicatorGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<IndicatorGroup> indicatorGroups = _context.IndicatorGroups.ToList(); ;

            foreach(IndicatorGroup ig in indicatorGroups)
            {
                if (ig.Name.ToUpper().Trim().Equals(indicatorGroup.Name.ToUpper().Trim()))
                {
                    return Json(false);
                }
            }

            _context.IndicatorGroups.Add(indicatorGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIndicatorGroup", new { id = indicatorGroup.IndicatorGroupID }, indicatorGroup);
        }

        // DELETE: api/IndicatorGroups/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "administrador_indicadores")]
        public async Task<IActionResult> DeleteIndicatorGroup([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var indicatorGroup = await _context.IndicatorGroups.SingleOrDefaultAsync(m => m.IndicatorGroupID == id);
            if (indicatorGroup == null)
            {
                return NotFound();
            }

            _context.IndicatorGroups.Remove(indicatorGroup);
            await _context.SaveChangesAsync();

            return Ok(indicatorGroup);
        }

        // GET: api/IndicatorGroups/1/Calculate (group= 1)
        [Route("{id:int}/Calculate")]
        [Authorize(Roles = "administrador_indicadores,gestor_contenido")]
        public async Task<IActionResult> CalculateIndicators([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Load from the DB the IndicatorGroups with its Indicators and Registries
            var indicatorGroup = await _context.IndicatorGroups
                .Where(g => g.IndicatorGroupID == id)
                .Include(g => g.Indicators)
                .ThenInclude(i => i.Registries)
                .SingleOrDefaultAsync();            
            
            // If the specified indicator group doesn't exist, show NotFound
            if (indicatorGroup == null)
            {
                return NotFound();
            }

            // List of the results of every indicator of the group
            List<double> list = new List<double>();

            // Calculate every indicator of the group
            foreach (Indicator indicator in indicatorGroup.Indicators)
            {
                indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
                list.Add(indicator.IndicatorCalculator.Calculate(indicator.Registries));
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/IndicatorGroups/1/Calculate/Year/2018 (group= 1, year= 2018)
        [Route("{id:int}/Calculate/Year/{year:int}")]
        [Authorize(Roles = "administrador_indicadores,gestor_contenido")]
        public async Task<IActionResult> CalculateIndicators([FromRoute] int id, [FromRoute] int year)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Load from the DB the IndicatorGroups with its Indicators and Registries
            var indicatorGroup = await _context.IndicatorGroups
                .Where(g => g.IndicatorGroupID == id)
                .Include(g => g.Indicators)
                .ThenInclude(i => i.Registries)
                .SingleOrDefaultAsync();

            // If the specified indicator group doesn't exist, show NotFound
            if (indicatorGroup == null)
            {
                return NotFound();
            }

            // List of the results of every indicator of the group
            List<double> list = new List<double>();

            // Calculate every indicator of the group
            foreach (Indicator indicator in indicatorGroup.Indicators)
            {
                indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
                list.Add(indicator.IndicatorCalculator.CalculateYear(indicator.Registries, year));
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/IndicatorGroups/1/Calculate/Year/2018/Trimester/0 (group= 1, year= 2018, trimester= January-March)
        [Route("{id:int}/Calculate/Year/{year:int}/Trimester/{trimester:int}")]
        [Authorize(Roles = "administrador_indicadores,gestor_contenido")]
        public async Task<IActionResult> CalculateIndicatorsYearTrimester([FromRoute] int id, [FromRoute] int year, [FromRoute] int trimester)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            // Load from the DB the IndicatorGroups with its Indicators and Registries
            var indicatorGroup = await _context.IndicatorGroups
                .Where(g => g.IndicatorGroupID == id)
                .Include(g => g.Indicators)
                .ThenInclude(i => i.Registries)
                .SingleOrDefaultAsync();

            // If the specified indicator group doesn't exist, show NotFound
            if (indicatorGroup == null)
            {
                return NotFound();
            }

            // List of the results of every indicator of the group
            List<double> list = new List<double>();

            // Calculate every indicator of the group
            foreach (Indicator indicator in indicatorGroup.Indicators)
            {
                indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
                list.Add(indicator.IndicatorCalculator.CalculateYearTrimester(indicator.Registries, year, trimester));
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/IndicatorGroups/1/Calculate/Year/2018/Month/0 (group= 1, year= 2018, month= January)
        [Route("{id:int}/Calculate/Year/{year:int}/Month/{month:int}")]
        public async Task<IActionResult> CalculateIndicatorsYearMonth([FromRoute] int id, [FromRoute] int year, [FromRoute] int month)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Remember add 1 to month (the month starts in 0 on Angular and in 1 on C#)
            month = month + 1;

            // Load from the DB the IndicatorGroups with its Indicators and Registries
            var indicatorGroup = await _context.IndicatorGroups
                .Where(g => g.IndicatorGroupID == id)
                .Include(g => g.Indicators)
                .ThenInclude(i => i.Registries)
                .SingleOrDefaultAsync();

            // If the specified indicator group doesn't exist, show NotFound
            if (indicatorGroup == null)
            {
                return NotFound();
            }

            // List of the results of every indicator of the group
            List<double> list = new List<double>();

            // Calculate every indicator of the group
            foreach (Indicator indicator in indicatorGroup.Indicators)
            {
                indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
                list.Add(indicator.IndicatorCalculator.CalculateYearMonth(indicator.Registries, year, month));
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/IndicatorGroups/1/Calculate/Week/2018/6/9 (group= 1, week started at 9th July 2018)
        [Route("{id:int}/Calculate/Week/{year:int}/{month:int}/{day:int}")]
        public async Task<IActionResult> CalculateIndicatorsWeek([FromRoute] int id, [FromRoute] int year, [FromRoute] int month, [FromRoute] int day)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Remember add 1 to month (the month starts in 0 on Angular and in 1 on C#)
            month = month + 1;

            // Load from the DB the IndicatorGroups with its Indicators and Registries
            var indicatorGroup = await _context.IndicatorGroups
                .Where(g => g.IndicatorGroupID == id)
                .Include(g => g.Indicators)
                .ThenInclude(i => i.Registries)
                .SingleOrDefaultAsync();

            // If the specified indicator group doesn't exist, show NotFound
            if (indicatorGroup == null)
            {
                return NotFound();
            }

            // List of the results of every indicator of the group
            List<double> list = new List<double>();

            // Calculate every indicator of the group
            foreach (Indicator indicator in indicatorGroup.Indicators)
            {
                indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
                list.Add(indicator.IndicatorCalculator.CalculateWeek(indicator.Registries, year, month, day));
            }

            // Return the list with the results
            return Ok(list);
        }


        // GET: api/IndicatorGroups/1/Goals (group= 1)
        [Route("{id:long}/Goals")]
        [Authorize(Roles = "administrador_indicadores,gestor_contenido")]
        public async Task<IActionResult> GetGoalsIndicators([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Load from the DB the Indicators 
            var indicators = await _context.Indicators
                .Where(i => i.IndicatorGroupID == id)
                .Include(i => i.Goals)
                .ToListAsync();            

            // If the specified indicator group don't have indicators, show NotFound
            if (!indicators.Any())
            {
                return NotFound();
            }

            // List of the sums of goals of every indicator of the group
            List<double> list = new List<double>();
                                
            foreach (Indicator indicator in indicators)
            {
                // Assign the indicator calculator
                indicator.RegistriesType = indicator.RegistriesType;

                list.Add(indicator.IndicatorCalculator.CalculateGoal(indicator.Goals));                                
            }

            // Return the list with the results
            return Ok(list);
        }


        // GET: api/IndicatorGroups/1/Goals/Year/2018 (group = 1, year = 2018)
        [Route("{id:long}/Goals/Year/{year:int}")]
        [Authorize(Roles = "administrador_indicadores,gestor_contenido")]
        public async Task<IActionResult> GetGoalsIndicators([FromRoute] int id, [FromRoute] int year)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Load from the DB the Indicators 
            var indicators = await _context.Indicators
                .Where(i => i.IndicatorGroupID == id)
                .Include(i => i.Goals)
                .ToListAsync();

            // If the specified indicator group don't have indicators, show NotFound
            if (!indicators.Any())
            {
                return NotFound();
            }

            // Sum the goals of every indicator of the group of the specified year
            List<double> list = new List<double>();
            foreach (Indicator indicator in indicators)
            {
                // Assign the indicator calculator
                indicator.RegistriesType = indicator.RegistriesType;

                var goalsYear = indicator.Goals.Where(i => i.Year == year).ToList();
                list.Add(indicator.IndicatorCalculator.CalculateGoal(goalsYear));
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/IndicatorGroups/1/Goals/Year/2018/Trimester/0 (group = 1, year = 2018, trimester = January-March)
        [Route("{id:long}/Goals/Year/{year:int}/Trimester/{trimester:int}")]
        [Authorize(Roles = "administrador_indicadores,gestor_contenido")]
        public async Task<IActionResult> GetGoalsIndicatorsYearTrimester([FromRoute] int id, [FromRoute] int year, [FromRoute] int trimester)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            // Load from the DB the Indicators 
            var indicators = await _context.Indicators
                .Where(i => i.IndicatorGroupID == id)
                .Include(i => i.Goals)
                .ToListAsync();

            // If the specified indicator group don't have indicators, show NotFound
            if (!indicators.Any())
            {
                return NotFound();
            }

            // The goals of every indicator of the group of the specified year and month
            List<double> list = new List<double>();
            foreach (Indicator indicator in indicators)
            {
                int trimesterInitialIndex = (trimester + 1) * 3 - 3;

                // Assign the indicator calculator
                indicator.RegistriesType = indicator.RegistriesType;

                var goalsYearTrimester = indicator.Goals.Where(i => i.Year == year 
                    && (i.Month == trimesterInitialIndex || i.Month == trimesterInitialIndex + 1 || i.Month == trimesterInitialIndex + 2))
                    .ToList();

                list.Add(indicator.IndicatorCalculator.CalculateGoal(goalsYearTrimester));
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/IndicatorGroups/1/Goals/Year/2018/Month/0 (group = 1, year = 2018, month = January)
        [Route("{id:long}/Goals/Year/{year:int}/Month/{month:int}")]
        public async Task<IActionResult> GetGoalsIndicatorsYearMonth([FromRoute] int id, [FromRoute] int year, [FromRoute] int month)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            
            // Load from the DB the Indicators 
            var indicators = await _context.Indicators
                .Where(i => i.IndicatorGroupID == id)
                .Include(i => i.Goals)
                .ToListAsync();

            // If the specified indicator group don't have indicators, show NotFound
            if (!indicators.Any())
            {
                return NotFound();
            }

            // The goals of every indicator of the group of the specified year and month
            List<double> list = new List<double>();
            foreach (Indicator indicator in indicators)
            {
                // Assign the indicator calculator
                indicator.RegistriesType = indicator.RegistriesType;

                var goalsYearMonth = indicator.Goals.Where(i => i.Year == year && i.Month == month).ToList();

                list.Add(indicator.IndicatorCalculator.CalculateGoal(goalsYearMonth));
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/IndicatorGroups/1/Goals/Week/2018/6/9 (group = 1, week started at 9th July 2018)
        [Route("{id:long}/Goals/Week/{year:int}/{month:int}/{day:int}")]
        public async Task<IActionResult> GetGoalsIndicatorsWeek([FromRoute] int id, [FromRoute] int year, [FromRoute] int month, [FromRoute] int day)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            // Load from the DB the Indicators 
            var indicators = await _context.Indicators
                .Where(i => i.IndicatorGroupID == id)
                .Include(i => i.Goals)
                .ToListAsync();

            // If the specified indicator group don't have indicators, show NotFound
            if (!indicators.Any())
            {
                return NotFound();
            }

            // The goals of every indicator of the group of the specified year and month
            List<double> list = new List<double>();
            foreach (Indicator indicator in indicators)
            {
                // Assign the indicator calculator
                indicator.RegistriesType = indicator.RegistriesType;

                double result = indicator.IndicatorCalculator.CalculateGoalWeek(indicator.Goals, year, month, day);
                list.Add(result);
            }

            // Return the list with the results
            return Ok(list);
        }

        private bool IndicatorGroupExists(long id)
        {
            return _context.IndicatorGroups.Any(e => e.IndicatorGroupID == id);
        }
    }
}