import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject, TemplateRef,ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Models
import { Document } from '../../shared/models/document';
import { Indicator } from '../../shared/models/indicator';
import { Months } from '../../shared/models/months';
import { RegistryType } from '../../shared/models/registryType';

// Services
import { IndicatorService } from '../../services/indicator/indicator.service';
import { RegistryService } from '../../services/registry/registry.service';
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';
import { SessionService } from '../../services/session/session.service';

// Ngx-Bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// ng2-chart
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css'],
})
export class IndicatorDetailComponent implements OnInit {
  // For filtering by years
  private static ALL_YEARS = 'Todos los años';
  private static YEAR = 'Año '; // Part of the string that the DropDown has to show as selected
  // For filtering by months
  private static ALL_MONTHS = 'Todos los meses';

  private idIndicatorGroup: number;
  public indicatorGroupName$: Observable<string>;

  public idIndicator = -1;

  public indicator$: Observable<Indicator>;
  public goal$: Observable<number>;
  public value$: Observable<number>;
  router: Router;
  modalRef: BsModalRef;

  allYears: string = IndicatorDetailComponent.ALL_YEARS;
  selectedYearText: string; // Dropdown year "Año 2018"
  selectedYear: number; // Numeric value for selectionYear
  years: number[] = []; // List of years from 2018 to CurrentYear

  allMonths: string = IndicatorDetailComponent.ALL_MONTHS;
  selectedMonthText: string = IndicatorDetailComponent.ALL_MONTHS; // Default selection (string shown in the dropdown)
  selectedMonth: number; // The current selected month (number), depends of the name of the month in spanish.
  months: number[] = []; // List of the months from 0 (January) to the current month (defined in ngOnInit)
  monthsOfTheYear: string[] = []; // List with the list names of the months (in spanish) of the selected year (defined in ngOnInit)
  isMonthDisabled = false;  // Set 'true' when ALL_YEARS is selected. In other case, set false.

  public RegistryType = RegistryType;

  selectedTypeChart: string;
  typesChart: string[] = [];
  typeDispersion: string[] = [];

  public document: Document = null; // For EditDocument

  constructor(private service: IndicatorService,
    router: Router,
    private registryService: RegistryService,
    private indicatorGroupService: IndicatorGroupService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private sessionStorage: SessionService) {
    this.idIndicator = this.route.snapshot.params.idIndicator;
    this.idIndicatorGroup = this.route.snapshot.params.idIndicatorGroup;
    this.router = router;
  }

  ngOnInit() {
    this.indicator$ = this.service.getIndicator(this.idIndicator);
    this.updateExternalIndicator();

    const currentYear = new Date().getFullYear();
    const baseYear = 2018;
    for (let i = 0; i <= (currentYear - baseYear); i++) {
      this.years[i] = baseYear + i;
    }

    this.selectedYearText = this.sessionStorage.getYearText(IndicatorDetailComponent.YEAR + currentYear);
    this.selectedYear = this.sessionStorage.getYear(currentYear);

    const currentMonth = new Date().getMonth(); // 0 = Juanuary, 1 = February, ..., 11 = December
    // List of the months (numbers) from 0 to the current month (max 11)
    for (let i = 0; i <= currentMonth; i++) {
      this.months[i] = i;
    }
    this.setMonthsOfTheYear(); // List of the names of the months, based in the prior list (this.months)
    this.selectedMonthText = this.sessionStorage.getMonthText(IndicatorDetailComponent.ALL_MONTHS);
    this.selectedMonth = this.sessionStorage.getMonth(-1);
    this.indicatorGroupName$ = this.indicatorGroupService.getIndicatorGroupName(this.idIndicatorGroup);

    this.selectedTypeChart = 'Gráfico de línea'; // default chart type
    this.typesChart = ['Gráfico de barra', 'Gráfico de línea']; // array options chart type
    this.typeDispersion = ['Gráfico de dispersión'];


    if (this.selectedYear === -1) {
      this.isMonthDisabled = true;
    }

    this.loadDataByFilters();

  }

  loadDataByFilters() {
    if (this.isMonthDisabled === true) {
      if (this.selectedYear === -1) {
        this.selectRegistries(IndicatorDetailComponent.ALL_YEARS, '');
      } else {
        this.selectRegistries(this.selectedYear, '');
      }
    } else {
      this.selectRegistries('', this.selectedMonthText);
    }
  }

  selectRegistries(year: any, month: string) {
    if ((year as string).length !== 0 ) {
      if (year === IndicatorDetailComponent.ALL_YEARS) {
        this.indicator$ = this.service.getIndicator(this.idIndicator); // Show all the registries
        // Calculate indicator all years
        this.value$ = this.service.getIndicatorValue(this.idIndicator);
        this.goal$ = this.service.getGoal(this.idIndicator); // shows all goals
        this.selectedYearText = IndicatorDetailComponent.ALL_YEARS;
        this.sessionStorage.setYearText(this.selectedYearText);
        this.isMonthDisabled = true;  // Not able to select a month
        this.selectedYear = -1;
        this.sessionStorage.setYear(this.selectedYear);
      }
      // tslint:disable-next-line:one-line
      else {
        this.selectedYearText = IndicatorDetailComponent.YEAR + year; // Change the text on the dropdown
        this.sessionStorage.setYearText(this.selectedYearText);
        this.isMonthDisabled = false; // It's possible to select a month
        this.selectedYear = year;
        this.sessionStorage.setYear(this.selectedYear);
        // tslint:disable-next-line:max-line-length
        this.indicator$ = this.service.getIndicatorYearRegistries(this.idIndicator, this.selectedYear); // Show registries from the year selected
        // Calculate Indicator Selected Year
        this.value$ = this.service.getIndicatorValueYear(this.idIndicator, this.selectedYear);
        this.goal$ = this.service.getGoalYear(this.idIndicator, this.selectedYear);
        this.setMonths();
        }
      this.selectedMonthText = IndicatorDetailComponent.ALL_MONTHS;
      this.sessionStorage.setMonthText(this.selectedMonthText);
    }
    // tslint:disable-next-line:one-line
    else {
      if (month === IndicatorDetailComponent.ALL_MONTHS) {
        this.selectedMonth = -1; // Not selected a specific month
        this.sessionStorage.setMonth(this.selectedMonth);
        this.indicator$ = this.service.getIndicatorYearRegistries(this.idIndicator, this.selectedYear);
        // Calculate Indicator All MONTHS
        this.value$ = this.service.getIndicatorValueYear(this.idIndicator, this.selectedYear);
        this.selectedMonthText = IndicatorDetailComponent.ALL_MONTHS;
        this.sessionStorage.setMonthText(this.selectedMonthText);
        this.goal$ = this.service.getGoalYear(this.idIndicator, this.selectedYear);
      }
      // tslint:disable-next-line:one-line
      else{
        this.setSelectedMonth(month);
        this.indicator$ = this.service.getIndicatorYearMonthRegistries(this.idIndicator, this.selectedYear, this.selectedMonth);
        // Calculate Indicator selected MONTH
        this.value$ = this.service.getIndicatorValueYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);
        this.goal$ = this.service.getGoalYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);
        this.selectedMonthText = Months[this.selectedMonth]; // Change the value shown in the dropdown
        this.sessionStorage.setMonthText(this.selectedMonthText);
      }
    }
  }

  openModalEditDocument(template: TemplateRef<any>, selectedDocument: Document) {
    this.document = selectedDocument;
    this.modalRef = this.modalService.show(template);
  }

  selectChart(type: string, indicator: Indicator) {


    if (type === 'Gráfico de barra') {
      this.selectedTypeChart = 'Gráfico de barra'; // change the dropdownlist text
    } else if (type === 'Gráfico de línea') {
      this.selectedTypeChart = 'Gráfico de línea'; // change the dropdownlist text
    } else {
      this.selectedTypeChart = 'Gráfico de dispersión';
    }

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  gotoRegistry(registryID: number) {
    this.router.navigateByUrl('/registry/' + registryID);
  }

  gotoAddRegistry() {
    this.router.navigateByUrl('/indicator-add-registry');
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


  // Update the goals depending the already selected filters
  updateGoal(event) {
    if (this.selectedYear === -1) { // All years
      this.goal$ = this.service.getGoal(this.idIndicator);
    } else if (this.selectedMonth === -1) { // Specific year
      this.goal$ = this.service.getGoalYear(this.idIndicator, this.selectedYear);
    } else { // Specific year and month
      this.goal$ = this.service.getGoalYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);
    }
  }

  updateExternalIndicator() {
    this.indicator$.subscribe((indicator) => {
      if (indicator.registriesType === RegistryType.ExternalRegistry) {
        this.registryService.getRegistriesExternal().subscribe();
      }
    });
  }

}

