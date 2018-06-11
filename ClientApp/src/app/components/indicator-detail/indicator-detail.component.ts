import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions,  } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PercentPipe } from '@angular/common';

// Models
import { Document } from '../../shared/models/document';
import { Indicator } from '../../shared/models/indicator';
import { Months } from '../../shared/models/months';
import { Registry } from '../../shared/models/registry';

// Services
import { IndicatorService } from '../../services/indicator/indicator.service';
import { RegistryService } from '../../services/registry/registry.service';
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';
import { IndicatorDisplayComponent } from '../indicator-home/indicator-display/indicator-display.component';
import { $ } from 'protractor';
import { SessionService } from '../../services/session/session.service';

// Ngx-Bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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

  selectedTypeChart : string;
  typesChart : string[] = [];

    // lineChart
    public counter = 0;

    public lineChartData: Array<any> = [
      {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Cantidad de Registros', lineTension: 0}
    ];

    public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
      'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    public lineChartOptions: any = {
      responsive: true,
      elements: {
        point: {
          radius: 5,
          hitRadius: 5,
          hoverRadius: 7,
          hoverBorderWidth: 2
        }
      },
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      },
      maintainAspectRatio: false
    };
    public lineChartColors: Array<any> = [
      { // grey
        backgroundColor: 'rgba(144,188,36,0.4)',
        borderColor: 'rgba(0,149,58,1)',
        pointBackgroundColor: 'rgba(0,149,58,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: 'rgba(0,149,58,1)',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }

    ];
    public lineChartLegend = true;
    public lineChartType = 'line';


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

    this.selectedTypeChart = 'Gráfico de linea'; // default chart type
    this.typesChart = ['Gráfico de barra','Gráfico de linea']; // array options chart type


    if (this.selectedYear === -1) {
      this.isMonthDisabled = true;
    }
    
    this.loadDataByFilters();

  }

  loadDataByFilters() {
    if (this.isMonthDisabled === true) {
      if (this.selectedYear === -1) {
        this.selectRegistries(IndicatorDetailComponent.ALL_YEARS, '');
      }
      else {
        this.selectRegistries(this.selectedYear, '');
      }
    }
    else {
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

  selectChart(type: string, indicator: Indicator){


    if (type === 'Gráfico de barra'){
      this.selectedTypeChart = 'Gráfico de barra'; // change the dropdownlist text
      this.lineChartColors[0].backgroundColor = 'rgba(0,149,58,1)'; // change the bar colors
      this.lineChartType = 'bar'; // now the type is barchart

    }
    else if (type == 'Gráfico de linea'){
      this.selectedTypeChart = 'Gráfico de linea'; // change the dropdownlist text
      this.lineChartColors[0].backgroundColor = 'rgba(144,188,36,0.4)'; // back to the original color
      this.lineChartType = 'line'; // the type now is linechart
    }
    else{
      this.selectedTypeChart = 'Gráfico de dispersión';
    }

    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  gotoAddRegistry() {
    this.router.navigateByUrl('/indicator-add-registry');
  }

  gotoRegistry() {
    this.router.navigateByUrl('/registry-details/' + 1); // Reemplazar por ID, sacado del button
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

  public showGraph(indicator: Indicator) {
    if (this.counter++ % 200 === 0) {
      const _lineChartData: Array<any> = new Array(this.lineChartData.length);
      _lineChartData[0] = {data: new Array(this.lineChartData[0].data.length), label: this.lineChartData[0].label};

      let cantidad = 0;
      const cantidadAcumulada = 0;
      const monthMin = 0;

      /* Se ingresa 0 a todos los datos en el arreglo provisorio de los meses (_lineChartData) */
      for (let i = 0; i < 12; i++) {
        _lineChartData[0].data[i] = 0;
      }

      /* Ingreso de datos al arreglo provisorio de meses */
      // console.log("largo" + this.indicator.registries.length);
      for (let i = 0; i < indicator.registries.length; i++) {
        const date: Date = new Date(indicator.registries[i].date);
        const month = date.getMonth();
        // console.log("entre ctm !!!!:   " + month);
        /* if si el registro es de cantidad */
        if (indicator.registriesType === 1) {
          cantidad = indicator.registries[i].quantity;
          // console.log("Cantidad : "+cantidad);

          for (let j = 0; j < 12; j++) {
            if (j >= month) {
              _lineChartData[0].data[j] += cantidad;
            }
          }
        } else { // caso contrario si el registro es default o algun otro que no sea cantidad
          cantidad = 1;
          for (let j = 0; j < 12; j++) {
            if (j >= month) {
              _lineChartData[0].data[j] += cantidad;
            }
          }
        }
      }

      this.lineChartData = _lineChartData; // se ingresa los datos del arreglo provisorio al arreglo de meses original
    }
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



}

