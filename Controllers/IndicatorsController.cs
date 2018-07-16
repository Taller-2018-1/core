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
                .ThenInclude(x => x.Documents).SingleAsync();

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
                .SingleAsync();
            
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
                .SingleAsync();

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
                .SingleAsync();

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
                .SingleAsync();

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

            // Obtain the Goals
            var goals = await _context.Goals.Where(g => g.IndicatorID == id).ToListAsync();

            // Fails if not found
            if (goals == null) 
            {
                return NoContent();
            }

            double result = 0;
            foreach (Goal goal in goals)
            {
                result += goal.Value;
            }
            // Percent Registry
            var indicator = await _context.Indicators.SingleAsync(i => i.IndicatorID == id);
            if (indicator.RegistriesType == RegistryType.PercentRegistry){
                result /= goals.Count;
            }

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

            // Obtain the Goals
            var goals = await _context.Goals.Where(g => g.IndicatorID == id && g.Year == year).ToListAsync();

            // Fails if not found
            if (goals == null) 
            {
                return NoContent();
            }

            double result = 0;
            foreach (Goal goal in goals)
            {
                result += goal.Value;
            }
            // Percent Registry
            var indicator = await _context.Indicators.SingleAsync(i => i.IndicatorID == id);
            if (indicator.RegistriesType == RegistryType.PercentRegistry){
                result /= goals.Count;
            }

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
            var indicator = await _context.Indicators.Where(i => i.IndicatorID == id).SingleAsync();
            if (indicator == null) {
                return NoContent();
            }

            // Obtain the Goals
            // The month of the goals in the DB starts at 0 (equals to Angular side)
            var goal1 = await _context.Goals.Where(g => g.IndicatorID == id && g.Year == year && g.Month == (trimester + 1) * 3 - 1).SingleOrDefaultAsync();
            var goal2 = await _context.Goals.Where(g => g.IndicatorID == id && g.Year == year && g.Month == (trimester + 1) * 3 - 2).SingleOrDefaultAsync();
            var goal3 = await _context.Goals.Where(g => g.IndicatorID == id && g.Year == year && g.Month == (trimester + 1) * 3 - 3).SingleOrDefaultAsync();
            
            // Return 0 if not found
            if (goal1 == null && goal2 == null && goal3 == null)
            {
                return Ok(0);
            }
            else if (goal2 == null && goal3 == null)
            {
                return Ok(goal1.Value);
            }
            else if (goal3 == null)
            {
                if (indicator.RegistriesType == RegistryType.PercentRegistry) {
                    return Ok((goal1.Value + goal2.Value) / 2);
                }
                return Ok(goal1.Value + goal2.Value);
            }
            else
            {
                if (indicator.RegistriesType == RegistryType.PercentRegistry)
                {
                    return Ok((goal1.Value + goal2.Value + goal3.Value) / 3);
                }
                return Ok(goal1.Value + goal2.Value + goal3.Value);
            }
        }

        // GET: api/Indicators/1/Goals/Year/2018/Month/0 (indicator 1, year 2018, month January)
        [HttpGet("{id:long}/Goals/Year/{year:int}/Month/{month:int}")]
        public async Task<IActionResult> GetIndicatorGoalsMonth([FromRoute] long id, [FromRoute] int year, [FromRoute] int month)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Obtain the Goal
            // The month of the goals in the DB starts at 0 (equals to Angular side)
            var goal = await _context.Goals.Where(g => g.IndicatorID == id && g.Year == year && g.Month == month).SingleAsync();

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

            // Obtain the sum of the goals of the 7 days of the week
            // The month in c# starts in 1
            DateTime date = new DateTime(startWeekYear, startWeekMonth +  1, startWeekDay);
            double sum = 0;
            for (int i = 0; i < 7; i++) {
                DateTime newDate = date.AddDays(i);
                // The month of the goals in the DB starts at 0
                var goal = await _context.Goals.Where(g => g.IndicatorID == id && g.Year == newDate.Year && g.Month == newDate.Month - 1).SingleAsync();

                // Return 0 if not found
                if (goal != null)
                {
                    sum += goal.Value;
                }
            }
            
            return Ok(sum / 7.0);
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
                list.Add(indicator.IndicatorCalculator.Calculate(indicator.Registries, year));
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
                .SingleAsync();

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
                .SingleAsync();

            if (indicator == null)
            {
                return NoContent();
            }

            indicator.RegistriesType = indicator.RegistriesType; // Assign the IndicatorCalculator according to the Indicator's RegistriesType
            var value = indicator.IndicatorCalculator.Calculate(indicator.Registries, year);

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
                .SingleAsync();

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
                .SingleAsync();

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
                .SingleAsync();

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
                    return NoContent();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Indicators
        [HttpPost]
        public async Task<IActionResult> PostIndicator([FromBody] Indicator indicator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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

            var indicator = await _context.Indicators.SingleAsync(m => m.IndicatorID == id);
            if (indicator == null)
            {
                return NoContent();
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
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndicatorExists(indicatorId))
                {
                    return NoContent();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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
                return NoContent();
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
                    return NoContent();
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