import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DecimalPipe } from '@angular/common';
import { Router } from "@angular/router";

// Models
import { Indicator } from '../../../shared/models/indicator';
import { Months } from '../../../shared/models/months';
import { RegistryType } from '../../../shared/models/registryType';

// Services
import { RegistryService } from '../../../services/registry/registry.service';
import { IndicatorGroupService } from '../../../services/indicator-group/indicator-group.service';
import { IndicatorGroup } from '../../../shared/models/indicatorGroup';
import { SessionService } from '../../../services/session/session.service';

@Component({
  selector: 'app-indicator-display',
  templateUrl: './indicator-display.component.html',
  styleUrls: ['./indicator-display.component.css']
})

export class IndicatorDisplayComponent implements OnInit {
  private static ALL_YEARS = 'Todos los años';
  private static ALL_MONTHS = 'Todos los meses';
  private static YEAR = 'Año '; // In the front of the selected year (e.g.: 'Año 2018')
  // Used in the html to keep the consistency
  private static TRIMESTER = 'Trimestre';
  allYears: string = IndicatorDisplayComponent.ALL_YEARS;
  allMonths: string = IndicatorDisplayComponent.ALL_MONTHS;
  allTrimester: string = IndicatorDisplayComponent.TRIMESTER;

  @Input() indicatorGroup: IndicatorGroup;

  indicatorResults$: Observable<number[]>;
  selectedYearText: string; // Default selection = currentYear (defined in ngOnInit) (string shown in the dropdown)
  // tslint:disable-next-line:max-line-length
  selectedMonthText: string = IndicatorDisplayComponent.ALL_MONTHS; // Default selection (string shown in the dropdown)
  selectedTrimesterText: string;
  selectedYear: number; // The current selected year (number), by default = currentYear (defined in ngOnInit)
  selectedTrimester: number // The current selected trimester
  selectedMonth: number; // The current selected month (number), depends of the name of the month in spanish.
  years: number[] = []; // List of the years from baseYear to currentYear (defined in ngOnInit)
  // tslint:disable-next-line:max-line-length
  months: number[] = []; // List of the months from 0 (January) to the current month (defined in ngOnInit)
  monthsOfTheYear: string[] = []; // List with the list names of the months (in spanish) of the selected year (defined in ngOnInit)
  trimesters: string[] = []; // List of the four timester of the year.
  isMonthDisabled = false;  // Set 'true' when ALL_YEARS is selected. In other case, set false.

  goals$: Observable<number[]>;

  private router: Router;

  constructor(private service: IndicatorGroupService,
    private registryService: RegistryService,
    private sessionStorage: SessionService,
    router: Router) {
    this.router = router;
  }

  ngOnInit() {
    this.updateExternalIndicator();
    const currentYear = new Date().getFullYear();
    this.indicatorResults$ = this.service.calculateIndicatorGroupYear(this.indicatorGroup.indicatorGroupID, currentYear);

    // Create the list of years from baseYear to currentYear
    const baseYear = 2018; // Year in which this project began
    for (let i = 0; i <= (currentYear - baseYear); i++) {
        this.years[i] = baseYear + i;
    }
    this.selectedYearText = this.sessionStorage.getYearText(IndicatorDisplayComponent.YEAR + currentYear);
    this.selectedYear = this.sessionStorage.getYear(currentYear);

    const defaultTrimester = 0;
    this.selectedTrimester = -1;

    const currentMonth = new Date().getMonth(); // 0 = Juanuary, 1 = February, ..., 11 = December
    // List of the months (numbers) from 0 to the current month (max 11)
    for (let i = 0; i <= currentMonth; i++) {
      this.months[i] = i;
    }
    this.setMonthsOfTheYear(); // List of the names of the months, based in the prior list (this.months)

    this.selectedMonthText = this.sessionStorage.getMonthText(IndicatorDisplayComponent.ALL_MONTHS);
    this.selectedMonth = this.sessionStorage.getMonth(-1);

    if (this.selectedYear === -1) {
      this.isMonthDisabled = false;
    }

    this.loadDataByFilters();
  }

  loadDataByFilters() {
    if (this.isMonthDisabled === true) {
      if (this.selectedYear === -1) {
        this.calculateIndicators(IndicatorDisplayComponent.ALL_YEARS, '');
      }
      else {
        this.calculateIndicators(this.selectedYear, '');
      }
    }
    else {
      this.calculateIndicators('', this.selectedMonthText);
    }
  }

  // Only specify the year or the month, depending on which one is changed, the other value must be an empty string ('')
  calculateIndicators(year: any, month: string) { // The 'year' is of type 'any' because it's used as 'int' and 'string'}
    const currentYear = new Date().getFullYear();
    // The change is in the year
    if ((year as string).length !== 0) {
      // ALL_YEARS selected
      if (year === IndicatorDisplayComponent.ALL_YEARS) {
        this.indicatorResults$ = this.service.calculateIndicatorGroup(this.indicatorGroup.indicatorGroupID); // Calculate for all the years
        this.goals$ = this.service.getGoals(this.indicatorGroup.indicatorGroupID);
        this.selectedYearText = IndicatorDisplayComponent.ALL_YEARS; // Change the value shown in the dropdown
        this.sessionStorage.setYearText(this.selectedYearText);
        this.isMonthDisabled = true;  // Not able to select a month
        this.selectedYear = -1; // Not selected a specific year
        this.sessionStorage.setYear(this.selectedYear);
      }
      // Selected a specific year
      // tslint:disable-next-line:one-line
      else {
        // tslint:disable-next-line:max-line-length
        this.indicatorResults$ = this.service.calculateIndicatorGroupYear(this.indicatorGroup.indicatorGroupID, year); // Calculate for the specific year
        this.goals$ = this.service.getGoalsYear(this.indicatorGroup.indicatorGroupID, year);
        this.selectedYearText = IndicatorDisplayComponent.YEAR + year; // Change the value shown in the dropdown
        this.sessionStorage.setYearText(this.selectedYearText);
        this.isMonthDisabled = false; // It's possible to select a month
        this.selectedYear = year;
        this.sessionStorage.setYear(this.selectedYear);
        this.setMonths();
      }
      this.selectedMonthText = IndicatorDisplayComponent.ALL_MONTHS;
      this.sessionStorage.setMonthText(this.selectedMonthText);
    }
    // The change is in the month
    // tslint:disable-next-line:one-line
    else {
      // All the months of the already selected year
      if (month === IndicatorDisplayComponent.ALL_MONTHS) {
        this.selectedMonth = -1; // Not selected a specific month
        this.sessionStorage.setMonth(this.selectedMonth);
        // tslint:disable-next-line:max-line-length
        this.indicatorResults$ = this.service.calculateIndicatorGroupYear(this.indicatorGroup.indicatorGroupID, this.selectedYear); // Calculate for the already selected year
        this.goals$ = this.service.getGoalsYear(this.indicatorGroup.indicatorGroupID, this.selectedYear);
        this.selectedMonthText = IndicatorDisplayComponent.ALL_MONTHS; // Change the value shown in the dropdown
        this.sessionStorage.setMonthText(this.selectedMonthText);
      }
      // Selected a specific month of the already selected year
      // tslint:disable-next-line:one-line
      else {
        this.setSelectedMonth(month); // Set the numeric value of the month as selected (needed for the calculation)
        // Do the calculation for the already selected year and month
        // tslint:disable-next-line:max-line-length
        this.indicatorResults$ = this.service.calculateIndicatorGroupYearMonth(this.indicatorGroup.indicatorGroupID, this.selectedYear, this.selectedMonth);
        this.goals$ = this.service.getGoalsYearMonth(this.indicatorGroup.indicatorGroupID, this.selectedYear, this.selectedMonth);
        this.selectedMonthText = Months[this.selectedMonth]; // Change the value shown in the dropdown
        this.sessionStorage.setMonthText(this.selectedMonthText);
      }
    }
  }

  // Set the list of the months (numbers) from 0 to the current month (max 11)
  // The months depends on the selected year (this.selectedYear)
  setMonths() {
    const currentYear = new Date().getFullYear();
    if (this.selectedYear < currentYear) {
      this.months = [];
      for (let i = 0; i <= 11; i++) { // Months from January (0) to December (11)
        this.months[i] = i;
      }
    }
    // tslint:disable-next-line:one-line
    else {
      this.months = [];
      console.log(this.months);
      const currentMonth = new Date().getMonth(); // 0 = Juanuary, 1 = February, ..., 11 = Decembery
      for (let i = 0; i <= currentMonth; i++) {
        this.months[i] = i;
      }
    }
    this.setMonthsOfTheYear();
  }

  // Sets the names of the months of the selected year
  setMonthsOfTheYear() {
    this.monthsOfTheYear = [];
    this.months.forEach(month => {
      this.monthsOfTheYear[month] = Months[month];
    });
  }

  // According to the name of a month, it sets the corresponding number to the 'selectedMonth'
  setSelectedMonth(month: string) {
    this.selectedMonth = Months[month];
    this.sessionStorage.setMonth(this.selectedMonth);
  }

  gotoIndicator(idIndicatorGroup: number, idIndicator: number) {
    this.router.navigateByUrl("/indicator/" + idIndicatorGroup + "/" + idIndicator);
  }

  updateExternalIndicator() {
    this.indicatorGroup.indicators.forEach(indicator => {
      if (indicator.registriesType === RegistryType.ExternalRegistry) {
        this.registryService.getRegistriesExternal().subscribe();
      }
    });
  }
}
