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
    [Route("api/Indicators")]
    public class IndicatorsController : Controller
    {
        private readonly DataContext _context;

        public IndicatorsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Indicators
        [HttpGet]
        public async Task<IActionResult> GetIndicators()
        {
            var indicators = await _context.Indicators
                .Include(x => x.Goals)
                .Include(x => x.Registries)                
                .ThenInclude(x => x.Documents).ToListAsync();

            return Ok(indicators);
        }

        // GET: api/Indicators/5
        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetIndicator([FromRoute] long id)
        {            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var indicatorQuery = _context.Indicators.Where(x => x.IndicatorID == id);

            var indicator = await indicatorQuery
                .Include(x => x.Goals)
                .Include(x => x.Registries)
                .ThenInclude(x => x.Documents).SingleOrDefaultAsync();

            if (indicator == null)
            {
                return NoContent();
            }

            return Ok(indicator);
        }

        // GET: api/Indicators/5/Year/2018
        [HttpGet("{id:long}/Year/{year:int}")]
        public async Task<IActionResult> GetIndicatorRegitriesByYear([FromRoute] long id, [FromRoute] int year)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Registries
            var registries = await _context.Registries
                .Where(r => r.IndicatorID == id && r.Date.Year == year)
                .Include(r => r.Documents)
                .ToArrayAsync();

            var indicator = await _context.Indicators
                .Where(i => i.IndicatorID == id)
                .Include(i => i.Goals)
                .SingleOrDefaultAsync();
            
            // Fails if not found
            if (indicator == null)
            {
                return NoContent();
            }

            indicator.Registries = registries;

            return Ok(indicator);
        }

        // GET: api/Indicators/5/Year/2018/Trimester/1
        [HttpGet("{id:long}/Year/{year:int}/Trimester/{trimester:int}")]
        public async Task<IActionResult> GetIndicatorRegitriesByYearTrimester([FromRoute] long id, [FromRoute] int year, [FromRoute] int trimester)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            // Obtain the Registries
            var registries = await _context.Registries
                .Where(r => r.IndicatorID == id && r.Date.Year == year 
                && (r.Date.Month == (trimester + 1) * 3 || r.Date.Month == (trimester + 1) * 3 - 1 || r.Date.Month == (trimester + 1) * 3 - 2))
                .Include(r => r.Documents)
                .ToArrayAsync();

            var indicator = await _context.Indicators
                .Where(i => i.IndicatorID == id)
                .Include(i => i.Goals)
                .SingleOrDefaultAsync();

            // Fails if not found
            if (indicator == null)
            {
                return NoContent();
            }

            indicator.Registries = registries;

            return Ok(indicator);
        }

        // GET: api/Indicators/5/Year/2018/Month/1
        [HttpGet("{id:long}/Year/{year:int}/Month/{month:int}")]
        public async Task<IActionResult> GetIndicatorRegitriesByYearMonth([FromRoute] long id, [FromRoute] int year, [FromRoute] int month)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Remember add 1 to month (the month starts in 0 on Angular and in 1 on C#)
            month = month + 1;

            // Obtain the Registries
            var registries = await _context.Registries
                .Where(r => r.IndicatorID == id && r.Date.Year == year && r.Date.Month == month)
                .Include(r => r.Documents)
                .ToArrayAsync();

            var indicator = await _context.Indicators
                .Where(i => i.IndicatorID == id)
                .Include(i => i.Goals)
                .SingleOrDefaultAsync();

            // Fails if not found
            if (indicator == null)
            {
                return NoContent();
            }

            indicator.Registries = registries;

            return Ok(indicator);
        }

        // GET: api/Indicators/5/Week/2018/6/9 (9th July 2018)
        [HttpGet("{id:long}/Week/{startWeekYear:int}/{startWeekMonth:int}/{startWeekDay:int}")]
        public async Task<IActionResult> GetIndicatorRegitriesByYearMonth([FromRoute] long id, [FromRoute] int startWeekYear, [FromRoute] int startWeekMonth, [FromRoute] int startWeekDay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Remember add 1 to month (the month starts in 0 on Angular and in 1 on C#)
            startWeekMonth = startWeekMonth + 1;

            DateTime date = new DateTime(startWeekYear, startWeekMonth, startWeekDay);

            // Obtain the Registries
            var registries = await _context.Registries
                .Where(r => r.IndicatorID == id && 
                    (r.Date == date || r.Date == date.AddDays(1) || r.Date == date.AddDays(2) || r.Date == date.AddDays(3) ||
                    r.Date == date.AddDays(4) || r.Date == date.AddDays(5) || r.Date == date.AddDays(6)))
                .Include(r => r.Documents)
                .ToArrayAsync();

            var indicator = await _context.Indicators
                .Where(i => i.IndicatorID == id)
                .Include(i => i.Goals)
                .SingleOrDefaultAsync();

            // Fails if not found
            if (indicator == null)
            {
                return NoContent();
            }

            indicator.Registries = registries;

            return Ok(indicator);
        }

        // GET: api/Indicators/1/Goals
        [HttpGet("{id:long}/Goals")]
        public async Task<IActionResult> GetIndicatorGoals([FromRoute] long id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var indicator = await _context.Indicators.Where(i => i.IndicatorID == id)
                .Include(i => i.Goals).SingleOrDefaultAsync();

            if (indicator == null) {
                return NoContent();
            }

            // Goals of the indicator
            var goals = indicator.Goals;

            // The indicator doesn't have goals (return 0)
            if (goals == null || !goals.Any())
            {
                return Ok(0);
            }

            // Assing indicator calculator
            indicator.RegistriesType = indicator.RegistriesType;

            double result = indicator.IndicatorCalculator.CalculateGoal(goals);

            return Ok(result);
        }

        // GET: api/Indicators/1/Goals/Year/2018
        [HttpGet("{id:long}/Goals/Year/{year:int}")]
        public async Task<IActionResult> GetIndicatorGoals([FromRoute] long id, [FromRoute] int year)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var indicator = await _context.Indicators.Where(i => i.IndicatorID == id)
                .Include(i => i.Goals).SingleOrDefaultAsync();

            if (indicator == null)
            {
                return NoContent();
            }

            // Goals of the indicator
            var goals = indicator.Goals.Where(g => g.Year == year).ToList();

            // The indicator doesn't have goals (return 0)
            if (goals == null || !goals.Any()) 
            {
                return Ok(0);
            }

            // Assing indicator calculator
            indicator.RegistriesType = indicator.RegistriesType;

            double result = indicator.IndicatorCalculator.CalculateGoal(goals);

            return Ok(result);
        }

        // GET: api/Indicators/1/Goals/Year/2018/Trimester/0 (indicator 1, year 2018, trimester January-March)
        [HttpGet("{id:long}/Goals/Year/{year:int}/Trimester/{trimester:int}")]
        public async Task<IActionResult> GetIndicatorGoalsTrimester([FromRoute] long id, [FromRoute] int year, [FromRoute] int trimester)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the indicator's registries type
            var indicator = await _context.Indicators.Where(i => i.IndicatorID == id)
                .Include(i => i.Goals).SingleOrDefaultAsync();

            if (indicator == null) {
                return NoContent();
            }

            // Obtain the Goals
            // The month of the goals in the DB starts at 0 (equals to Angular side)
            int firstMonthTrimester = (trimester + 1) * 3 - 3;

            var goals = indicator.Goals.Where(g => g.Year == year
            && (g.Month == firstMonthTrimester || g.Month == firstMonthTrimester + 1 || g.Month == firstMonthTrimester + 2)).ToList();

            // Assing indicator calculator
            indicator.RegistriesType = indicator.RegistriesType;

            double result = indicator.IndicatorCalculator.CalculateGoal(goals);

            return Ok(result);
            
        }

        // GET: api/Indicators/1/Goals/Year/2018/Month/0 (indicator 1, year 2018, month January)
        [HttpGet("{id:long}/Goals/Year/{year:int}/Month/{month:int}")]
        public async Task<IActionResult> GetIndicatorGoalsMonth([FromRoute] long id, [FromRoute] int year, [FromRoute] int month)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var indicator = await _context.Indicators.Where(i => i.IndicatorID == id)
                .Include(i => i.Goals).SingleOrDefaultAsync();

            if (indicator == null) {
                return NoContent();
            }

            // Obtain the Goal
            // The month of the goals in the DB starts at 0 (equals to Angular side)
            var goal =  indicator.Goals.Where(g => g.Year == year && g.Month == month).SingleOrDefault();

            // Return 0 if not found
            if (goal == null) 
            {
                return Ok(0);
            }

            return Ok(goal.Value);
        }

        // GET: api/Indicators/1/Goals/Week/2018/6/9 (9th July 2018)
        [HttpGet("{id:long}/Goals/Week/{startWeekYear:int}/{startWeekMonth:int}/{startWeekDay:int}")]
        public async Task<IActionResult> GetIndicatorGoalsWeek([FromRoute] long id, [FromRoute] int startWeekYear, [FromRoute] int startWeekMonth, [FromRoute] int startWeekDay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var indicator = await _context.Indicators.Where(i => i.IndicatorID == id)
                .Include(i => i.Goals).SingleOrDefaultAsync();

            if (indicator == null)
            {
                return NoContent();
            }

            // Assign indicator calculator
            indicator.RegistriesType = indicator.RegistriesType;

            double result = indicator.IndicatorCalculator.CalculateGoalWeek(indicator.Goals, startWeekYear, startWeekMonth, startWeekDay);

            return Ok(result);
        }

        // GET: api/Indicators/Calculate
        [Route("Calculate")]
        public async Task<IActionResult> CalculateIndicators()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Indicators with its Registries
            var indicators = await _context.Indicators
                .Include(i => i.Registries)
                .ToListAsync();

            // If the indicators list is empty, show NoContent
            if (!indicators.Any())
            {
                return NoContent();
            }

            // List of the results of every indicator
            List<double> list = new List<double>();

            // Calculate every indicator
            foreach (Indicator indicator in indicators) {
                indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
                list.Add(indicator.IndicatorCalculator.Calculate(indicator.Registries));
            }
            
            // Return the list with the results
            return Ok(list);
        }
        
        // GET: api/Indicators/Calculate/Year/2018
        [Route("Calculate/Year/{year:int}")]
        public async Task<IActionResult> CalculateIndicators([FromRoute] int year)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Indicators with its Registries
            var indicators = await _context.Indicators
                .Include(i => i.Registries)
                .ToListAsync();

            // If the indicators list is empty, show NoContent
            if (!indicators.Any())
            {
                return NoContent();
            }

            // List of the results of every indicator
            List<double> list = new List<double>();

            // Calculate every indicator
            foreach (Indicator indicator in indicators) {
                indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
                list.Add(indicator.IndicatorCalculator.CalculateYear(indicator.Registries, year));
            }
            
            // Return the list with the results
            return Ok(list);
        }

        // GET: api/Indicators/Calculate/Year/2018/Trimester/1
        [Route("Calculate/Year/{year:int}/Trimester/{trimester:int}")]
        public async Task<IActionResult> CalculateIndicatorsYearTrimester([FromRoute] int year, [FromRoute] int trimester)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Indicators with its Registries
            var indicators = await _context.Indicators
                .Include(i => i.Registries)
                .ToListAsync();

            // If the indicators list is empty, show NoContent
            if (!indicators.Any())
            {
                return NoContent();
            }

            // List of the results of every indicator
            List<double> list = new List<double>();

            // Calculate every indicator
            foreach (Indicator indicator in indicators)
            {
                indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
                list.Add(indicator.IndicatorCalculator.CalculateYearTrimester(indicator.Registries, year, trimester));
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/Indicators/Calculate/Year/2018/Month/1
        [Route("Calculate/Year/{year:int}/Month/{month:int}")]
        public async Task<IActionResult> CalculateIndicatorsYearMonth([FromRoute] int year, [FromRoute] int month)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Indicators with its Registries
            var indicators = await _context.Indicators
                .Include(i => i.Registries)
                .ToListAsync();

            // If the indicators list is empty, show NoContent
            if (!indicators.Any())
            {
                return NoContent();
            }

            // Remember add 1 to month (the month starts in 0 on Angular and in 1 on C#)
            month = month + 1;

            // List of the results of every indicator
            List<double> list = new List<double>();

            // Calculate every indicator
            foreach (Indicator indicator in indicators) {
                indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
                list.Add(indicator.IndicatorCalculator.CalculateYearMonth(indicator.Registries, year, month));
            }
            
            // Return the list with the results
            return Ok(list);
        }

        // GET: api/Indicators/Calculate/Week/2018/6/9      9 of July of 2018
        [Route("Calculate/Week/{startWeekYear:int}/{startWeekMonth:int}/{startWeekDay:int}")]
        public async Task<IActionResult> CalculateIndicatorsYearWeek([FromRoute] int year, [FromRoute] int startWeekYear, [FromRoute] int startWeekMonth, [FromRoute] int startWeekDay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Indicators with its Registries
            var indicators = await _context.Indicators
                .Include(i => i.Registries)
                .ToListAsync();

            // If the indicators list is empty, show NoContent
            if (!indicators.Any())
            {
                return NoContent();
            }

            // Remember add 1 to month (the month starts in 0 on Angular and in 1 on C#)
            startWeekMonth = startWeekMonth + 1;

            // List of the results of every indicator
            List<double> list = new List<double>();

            // Calculate every indicator
            foreach (Indicator indicator in indicators)
            {
                indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
                list.Add(indicator.IndicatorCalculator.CalculateWeek(indicator.Registries, startWeekYear, startWeekMonth, startWeekDay));
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/Indicators/5/Calculate // Calculate Indicator with ID 5 for all years
        [Route("{id:long}/Calculate")]
        public async Task<ActionResult> CalculateIndicator([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Indicator with its Registries
            var indicator = await _context.Indicators
                .Where(i => i.IndicatorID == id)
                .Include(i => i.Registries)
                .SingleOrDefaultAsync();

            if (indicator == null)
            {
                return NoContent();
            }

            indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
            var value = indicator.IndicatorCalculator.Calculate(indicator.Registries);

            return Ok(value);
        }

        // GET: api/Indicators/5/Calculate/Year/2018 // Calculate Indicator with ID 5 for a selected year
        [Route("{id:long}/Calculate/Year/{year:int}")]
        public async Task<ActionResult> CalculateIndicatorByYear([FromRoute] long id, [FromRoute] int year)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Indicator with its Registries
            var indicator = await _context.Indicators
                .Where(i => i.IndicatorID == id)
                .Include(i => i.Registries)
                .SingleOrDefaultAsync();

            if (indicator == null)
            {
                return NoContent();
            }

            indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
            var value = indicator.IndicatorCalculator.CalculateYear(indicator.Registries, year);

            return Ok(value);
        }

        // GET: api/Indicators/5/Calculate/Year/2018/Trimester/0 // Calculate Indicator with ID 5 for a selected year and selected trimester
        [Route("{id:long}/Calculate/Year/{year:int}/Trimester/{trimester:int}")]
        public async Task<ActionResult> CalculateIndicatorByYearTrimester([FromRoute] long id, [FromRoute] int year, [FromRoute] int trimester)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Indicator with its Registries
            var indicator = await _context.Indicators
                .Where(i => i.IndicatorID == id)
                .Include(i => i.Registries)
                .SingleOrDefaultAsync();

            if (indicator == null)
            {
                return NoContent();
            }

            indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
            var value = indicator.IndicatorCalculator.CalculateYearTrimester(indicator.Registries, year, trimester);

            return Ok(value);
        }

        // GET: api/Indicators/5/Calculate/Year/2018/Month/0 // Calculate Indicator with ID 5 for a selected year and selected month
        [Route("{id:long}/Calculate/Year/{year:int}/Month/{month:int}")]
        public async Task<ActionResult> CalculateIndicatorByYearMonth([FromRoute] long id, [FromRoute] int year, [FromRoute] int month)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Remember add 1 to month (the month starts in 0 on Angular and in 1 on C#)
            month = month + 1;

            // Obtain the Indicator with its Registries
            var indicator = await _context.Indicators
                .Where(i => i.IndicatorID == id)
                .Include(i => i.Registries)
                .SingleOrDefaultAsync();

            if (indicator == null)
            {
                return NoContent();
            }

            indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
            var value = indicator.IndicatorCalculator.CalculateYearMonth(indicator.Registries, year, month);

            return Ok(value);
        }

        // GET: api/Indicators/5/Calculate/Week/2018/6/9 // Calculate Indicator with ID 5 for the week started the 9 of July of 2018
        [Route("{id:long}/Calculate/Week/{startWeekYear:int}/{startWeekMonth:int}/{startWeekDay:int}")]
        public async Task<ActionResult> CalculateIndicatorByYearWeek([FromRoute] long id, [FromRoute] int startWeekYear, [FromRoute] int startWeekMonth, [FromRoute] int startWeekDay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Remember add 1 to month (the month starts in 0 on Angular and in 1 on C#)
            startWeekMonth = startWeekMonth + 1;

            // Obtain the Indicator with its Registries
            var indicator = await _context.Indicators
                .Where(i => i.IndicatorID == id)
                .Include(i => i.Registries)
                .SingleOrDefaultAsync();

            if (indicator == null)
            {
                return NoContent();
            }

            indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
            var value = indicator.IndicatorCalculator.CalculateWeek(indicator.Registries, startWeekYear, startWeekMonth, startWeekDay);

            return Ok(value);
        }

        // PUT: api/Indicators/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIndicator([FromRoute] long id, [FromBody] Indicator indicator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            List<Indicator> indicators = await _context.Indicators.Where(i => i.Name == indicator.Name && i.IndicatorGroupID == indicator.IndicatorGroupID && i.IndicatorID != id).ToListAsync();

            if(indicators.Any()) {
                return NoContent();
            }

            if (id != indicator.IndicatorID)
            {
                return BadRequest();
            }

            _context.Entry(indicator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndicatorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var finalIndicator = await _context.Indicators.SingleOrDefaultAsync(i => i.IndicatorID == id);
            return Ok(finalIndicator);
        }

        // POST: api/Indicators
        [HttpPost]
        public async Task<IActionResult> PostIndicator([FromBody] Indicator indicator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<Indicator> indicators = _context.Indicators.ToList();

            foreach(Indicator i in indicators)
            {
                if (i.Name.ToUpper().Trim().Equals(indicator.Name.ToUpper().Trim()))
                {
                    return Json(false);
                }
            }

            _context.Indicators.Add(indicator);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIndicator", new { id = indicator.IndicatorID }, indicator);
        }

        // DELETE: api/Indicators/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIndicator([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var indicator = await _context.Indicators.SingleOrDefaultAsync(m => m.IndicatorID == id);
            if (indicator == null)
            {
                return NotFound();
            }

            _context.Indicators.Remove(indicator);
            await _context.SaveChangesAsync();

            return Ok(indicator);
        }

        private bool IndicatorExists(long id)
        {
            return _context.Indicators.Any(e => e.IndicatorID == id);
        }

        // ADD REGISTRY: api/Indicators/5/AddRegistry
        [HttpPost("{indicatorId}/AddRegistry")]
        public async Task<IActionResult> AddRegistry([FromRoute] long indicatorId,
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
				
				var createdRegistry = await _context.Registries.SingleOrDefaultAsync(m => m.RegistryID == registry.RegistryID);

				return Ok(createdRegistry);
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
        }

        // GET: api/Indicators/1/GoalsList
        [HttpGet("{id:long}/GoalsList")]
        public async Task<IActionResult> GetIndicatorGoalsList([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Goals
            var goals = await _context.Goals.Where(g => g.IndicatorID == id).ToListAsync();

            // Fails if not found
            if (goals == null)
            {
                return NotFound();
            }

            return Ok(goals);
        }

        // POST: api/Indicators/1/GoalsList
        [HttpPost("{idIndicator:long}/GoalsList")]
        public async Task<IActionResult> PostGoalsList([FromRoute] long idIndicator, [FromBody] Goal[] goals)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
                       
            _context.Goals.UpdateRange(goals);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIndicatorGoalsList", new { id = idIndicator }, goals);
        }

        // PUT: api/Indicators/7/Goal
        [HttpPut("{id:long}/Goal/")]
        public async Task<IActionResult> PutIndicatorGoal([FromBody] Goal goal, [FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != goal.GoalID)
            {
                return BadRequest();
            }

            _context.Entry(goal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Goals.Any(g => g.GoalID == id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }

            return Ok();
        }

    }
}