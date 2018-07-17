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
        public async Task<IActionResult> GetIndicatorGroups()
        {
            var indicatorGroups = await _context.IndicatorGroups
                .Include(g => g.Indicators)
                .ThenInclude(i => i.Goals)
                .ToListAsync();

            return Ok(indicatorGroups);
        }

        // GET: api/IndicatorGroups/5
        [HttpGet("{id}")]
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
        public async Task<IActionResult> GetIndicatorGroupName([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var indicatorGroup = await _context.IndicatorGroups.SingleAsync(x => x.IndicatorGroupID == id);

            if (indicatorGroup == null)
            {
                return NotFound();
            }

            return Ok(indicatorGroup.Name);
        }

        // PUT: api/IndicatorGroups/5
        [HttpPut("{id}")]
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
        public async Task<IActionResult> PostIndicatorGroup([FromBody] IndicatorGroup indicatorGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.IndicatorGroups.Add(indicatorGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIndicatorGroup", new { id = indicatorGroup.IndicatorGroupID }, indicatorGroup);
        }

        // DELETE: api/IndicatorGroups/5
        [HttpDelete("{id}")]
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
                .SingleAsync();            
            
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
                .SingleAsync();

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
                list.Add(indicator.IndicatorCalculator.Calculate(indicator.Registries, year));
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/IndicatorGroups/1/Calculate/Year/2018/Trimester/0 (group= 1, year= 2018, trimester= January-March)
        [Route("{id:int}/Calculate/Year/{year:int}/Trimester/{trimester:int}")]
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
                .SingleAsync();

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
                .SingleAsync();

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
                .SingleAsync();

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
                if (indicator.RegistriesType != RegistryType.PercentRegistry)
                {
                    double sum = 0;
                    foreach (Goal goal in indicator.Goals)
                    {
                        sum += goal.Value;
                    }
                    list.Add(sum);
                }
                else {
                    double sum = 0;
                    double quantity = 0;
                    foreach (Goal goal in indicator.Goals)
                    {
                        sum += goal.Value;
                        quantity++;
                    }
                    list.Add(sum / quantity);
                }
                
            }

            // Return the list with the results
            return Ok(list);
        }


        // GET: api/IndicatorGroups/1/Goals/Year/2018 (group = 1, year = 2018)
        [Route("{id:long}/Goals/Year/{year:int}")]
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
                if (indicator.Goals.Any())
                {
                    if (indicator.RegistriesType != RegistryType.PercentRegistry)
                    {
                        // If the indicator doesn't have percentual registries,
                        // the annual goal is calculated adding the goals of every month of the year
                        double sum = 0;
                        foreach (Goal goal in indicator.Goals)
                        {
                            if (goal.Year == year)
                            {
                                sum += goal.Value;
                            }                                
                        }
                        list.Add(sum);
                    }

                    else
                    {
                        // Add to the list the last goal added in the specified year
                        // If the year don't have a goal defined, it's added 0 to the list
                        // It's considered that the goals of the indicators with percentual registries rise every month during a year
                        int month = -1;
                        double value = 0;
                        foreach (Goal goal in indicator.Goals)
                        {                            
                            if (goal.Year == year)
                            {
                                if (goal.Month > month) {
                                    month = goal.Month;
                                    value = goal.Value;
                                }
                            }                            
                        }
                        if (month != -1)
                        {
                            list.Add(value);
                        }
                        else
                        {
                            list.Add(0);
                        }
                    }
                }

                else {
                    list.Add(0);
                }                         
            }

            // Return the list with the results
            return Ok(list);
        }

        // GET: api/IndicatorGroups/1/Goals/Year/2018/Trimester/0 (group = 1, year = 2018, trimester = January-March)
        [Route("{id:long}/Goals/Year/{year:int}/Trimester/{trimester:int}")]
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
                if (indicator.Goals.Any()) {
                    int trimesterInitialIndex = (trimester + 1) * 3 - 3;
                    if (indicator.RegistriesType != RegistryType.PercentRegistry)
                    {
                        double sum = 0;
                        foreach (Goal goal in indicator.Goals)
                        {
                            if (goal.Year == year &&
                                (goal.Month == trimesterInitialIndex || goal.Month == trimesterInitialIndex + 1 || goal.Month == trimesterInitialIndex + 2)
                                )
                            {
                                sum += goal.Value;
                            }
                        }
                        list.Add(sum);
                    }
                    else
                    {
                        // Add to the list of goals of the trimester the goal of the last month with a goal defined in the trimester
                        if (indicator.Goals.Count > trimesterInitialIndex)
                        {
                            if (indicator.Goals.Count > trimesterInitialIndex + 2)
                            {
                                list.Add(indicator.Goals.ElementAt(trimesterInitialIndex + 2).Value);
                            }
                            else {
                                list.Add(indicator.Goals.Last().Value);
                            }
                        }
                        else
                        {
                            list.Add(0);
                        }
                    }
                }

                else {
                    list.Add(0);
                }
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
                if (indicator.Goals.Any())
                {
                    bool added = false;
                    foreach (Goal goal in indicator.Goals)
                    {
                        if (goal.Year == year && goal.Month == month)
                        {
                            list.Add(goal.Value);
                            added = true;
                        }
                    }
                    if (!added)
                    {
                        list.Add(0);
                    }
                }
                else
                {
                    list.Add(0);               
                }              
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
                if (indicator.Goals.Any())
                {
                    DateTime date = new DateTime(year, month + 1, day);
                    if (indicator.RegistriesType != RegistryType.PercentRegistry)
                    {
                        double sum = 0;
                        foreach (Goal goal in indicator.Goals)
                        {
                            for (int i = 0; i < 7; i++)
                            {
                                DateTime newDate = date.AddDays(i);

                                if (goal.Year == newDate.Year && goal.Month == newDate.Month - 1)
                                {
                                    sum += (goal.Value / DateTime.DaysInMonth(newDate.Year, newDate.Month));
                                }
                            }                            
                        }
                        list.Add(Math.Round(sum, 0));
                    }
                    else
                    {
                        // Verify if the Sunday of the week is in the next month, 
                        // in that case add the goals of that month (the next one) to the list
                        // In other case, all the days og the week belongs to the same month, 
                        // so the goal of that month is added to the list
                        double firstValue = 0;
                        double secondValue = 0;
                        foreach (Goal goal in indicator.Goals)
                        {
                            DateTime newDate = date.AddDays(6);
                            if (goal.Year == date.Year && goal.Month == date.Month - 1)
                            {
                                firstValue = goal.Value;                                
                            }
                            if (goal.Year == newDate.Year && goal.Month == newDate.Month - 1)
                            {
                                secondValue = goal.Value;
                            }
                        }
                        if (secondValue == 0)
                        {
                            list.Add(firstValue);
                        }
                        else
                        {
                            list.Add(secondValue);
                        }
                    }
                    
                }
                else
                {
                    list.Add(0);
                }
                
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