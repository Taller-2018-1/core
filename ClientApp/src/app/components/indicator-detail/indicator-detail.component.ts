import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Models
import { Document, Indicator, Months, RegistryType, Trimesters } from '../../shared/models';

// Services
import { DateService } from '../../services/date/date.service';
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';
import { IndicatorService } from '../../services/indicator/indicator.service';
import { RegistryService } from '../../services/registry/registry.service';
import { SessionService } from '../../services/session/session.service';

// Ngx-Bootstrap
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css'],
})

export class IndicatorDetailComponent implements OnInit {
  router: Router;
  modalRef: BsModalRef;

  // Router params
  idIndicatorGroup: number;
  idIndicator: number;

  // Observables
  indicatorGroupName$: Observable<string>;
  indicator$: Observable<Indicator>;
  goal$: Observable<number>;
  value$: Observable<number>;

  // Dropdown date filters
  isSpecificYearSelected: boolean;
  isSpecificTrimesterSelected: boolean;
  isSpecificMonthSelected: boolean;
  isSpecificWeekSelected: boolean;
  selectedYear: number;
  selectedTrimester: number;
  selectedMonth: number;
  selectedWeek: number;

  // Allow to use the enum in the html tempalte
  RegistryType = RegistryType;

  // Charts
  selectedTypeChart: string;
  typesChart: string[] = [];
  typeDispersion: string[] = [];

  devStandar = 0;
  varianza = 0;

  // lineChart
  public counter = 0;

  public lineChartData: Array<any> = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Cantidad de Registros', lineTension: 0},
    // {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Cantidad de Registros', lineTension: 0}
    // {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Promedio', lineTension: 0}
  ];

  public DispersionChartData: Array<any> = [
    {data: new Array(), label: 'Cantidad de Registros'},
    // {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Cantidad de Registros', lineTension: 0}
    {data: new Array(), label: 'Promedio'}
  ];

  public lineChartLabels: Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
    'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  public lineChartOptions: any = {
    responsive: true,
    elements: {
      point: {
        radius: 5,
        hitRadius: 0,
        hoverRadius: 5,
        hoverBorderWidth: 0
      },
      line: {
        tension: 0
      }

    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
          }
      }]
    },
    maintainAspectRatio: false
  };

  public dispersionChartOptions: any = {
    responsive: true,
    tooltips: {
      callbacks: {
        // function that modify the tooltip title
        title: function(tooltipItem, data) {
          // get the dataset of point
          const datasetIndex = tooltipItem[0].datasetIndex;
          // get the data array
          const dispersionData = data.datasets[datasetIndex];
          // get the index
          const index = tooltipItem[0].index;
          // tooltip title
          const title = dispersionData.data[index].x;
          return title;
        }
      }
    },
    elements: {
      point: {
        radius: 5,
        hitRadius: 0,
        hoverRadius: 5,
        hoverBorderWidth: 0
      },
      line: {
        tension: 0
      }

    },
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              min: 0,
              max: 100,
              stepSize: 10
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
    },

    { // grey
      backgroundColor: 'transparent',
      borderColor: 'rgba(0,149,58,1)',
      pointBackgroundColor: 'rgba(0,149,58,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(0,149,58,1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];

  public dispersionChartColors: Array<any> = [
    { // grey
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      pointBackgroundColor: 'rgba(0,149,58,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(0,149,58,1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },

    { // grey
      backgroundColor: 'transparent',
      borderColor: 'rgba(0,149,58,1)',
      pointBackgroundColor: 'rgba(0,149,58,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(0,149,58,1)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  // Used for EditDocument
  public document: Document = null;


  constructor(private service: IndicatorService,
    router: Router,
    private registryService: RegistryService,
    private indicatorGroupService: IndicatorGroupService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {
    this.idIndicator = this.route.snapshot.params.idIndicator;
    this.idIndicatorGroup = this.route.snapshot.params.idIndicatorGroup;
    this.router = router;
  }

  ngOnInit() {
    this.indicator$ = this.service.getIndicator(this.idIndicator);
    this.updateExternalIndicator();

    this.indicatorGroupName$ = this.indicatorGroupService.getIndicatorGroupName(this.idIndicatorGroup);

    this.selectedTypeChart = 'Gráfico de línea'; // default chart type
    this.typesChart = ['Gráfico de barra', 'Gráfico de línea']; // array options chart type
    this.typeDispersion = ['Gráfico de dispersión'];
  }

  openModalEditDocument(template: TemplateRef<any>, selectedDocument: Document) {
    this.document = selectedDocument;
    this.modalRef = this.modalService.show(template);
  }

  selectChart(type: string, indicator: Indicator) {


    if (type === 'Gráfico de barra') {
      this.selectedTypeChart = 'Gráfico de barra'; // change the dropdownlist text
      this.lineChartColors[0].backgroundColor = 'rgba(144,188,36,0.4)'; // change the bar colors
      this.lineChartType = 'bar'; // now the type is barchart

    } else if (type === 'Gráfico de línea') {
      this.selectedTypeChart = 'Gráfico de línea'; // change the dropdownlist text
      this.lineChartColors[0].backgroundColor = 'rgba(144,188,36,0.4)'; // back to the original color
      this.lineChartType = 'line'; // the type now is linechart
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

  // show the dispersion chart
  public showDispersionGraph(indicator: Indicator) {
    if (this.counter++ % 200 === 0) {

      let promedio = 0;

      const _dispersionChartData: Array<any> = new Array(this.DispersionChartData.length);
      _dispersionChartData[0] = {data: new Array(), label: this.DispersionChartData[0].label};

      for (let i = 0; i < indicator.registries.length; i++) {
        const date: Date = new Date(indicator.registries[i].date);
        const month = date.getUTCMonth();
        let percent = indicator.registries[i].percent;
        percent = Number(percent); // convert string to number
        const datos = {x: this.lineChartLabels[month], y: percent};
        promedio += percent;
        _dispersionChartData[0].data.push(datos);
      }

      promedio = promedio / indicator.registries.length;

      _dispersionChartData[1] = {data: new Array(), label: this.DispersionChartData[1].label};

      const months = 12;
      for (let i = 0; i < months; i++) {
        promedio = Number(promedio); // convert string to number
        const datos = {x: this.lineChartLabels[i], y: promedio};
        _dispersionChartData[1].data.push(datos);
      }

      this.DispersionChartData = _dispersionChartData;

      // get callbacks properties
      const callbacks = this.dispersionChartOptions.tooltips.callbacks;
      // add new attribute to callbacks functions
      callbacks['label'] = function(tooltipItem, data) {

        const datasetIndex = tooltipItem.datasetIndex;
        const dispersionData = data.datasets[datasetIndex];
        const index = tooltipItem.index;
        // solo puntos dispersion
        if (datasetIndex === 0) {
          const registryName = indicator.registries[index].name;
          const percent = dispersionData.data[index].y;
          const label = registryName + ': ' + percent + '%';
          return label;
        }
        // solo linea promedio
        if (datasetIndex === 1) {
          const prom = dispersionData.data[index].y;
          const label = 'promedio: ' + prom + '%';
          return label;
        }

      };

      if (promedio !== 0) {
        this.calculateVariationIndicator(promedio);
      }
    }
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
          const month = date.getUTCMonth();
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
      console.log(this.lineChartData);
    }
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  // method to calculate the varianza and standard desviation
  calculateVariationIndicator(promedio: number): void {
    const data = this.DispersionChartData[0].data;
    const n = data.length;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const x = data[i].y; // get the percent
      sum = sum + Math.pow(x - promedio, 2);
    }
    // caso cuando hay un solo dato (n = 1 - 1 igual 0) division por cero igual NaN
    if (n - 1 !== 0) {
      const varianza = sum / (n - 1);
      this.varianza = Number(varianza.toFixed(2));

      const dev = Math.sqrt(sum / (n - 1));

      this.devStandar = Number(dev.toFixed(2));
    }
  }

  updateExternalIndicator() {
    this.indicator$.subscribe((indicator) => {
      if (indicator.registriesType === RegistryType.ExternalRegistry) {
        this.registryService.getRegistriesExternal().subscribe();
      }
    });
  }

  // Called when the editor of goals registers a change
  updateGoal(event) {
    // Verify dropdown selection bottom-up (from week to year)
    if (this.isSpecificWeekSelected) {
      this.goal$ = this.service.getGoalYearWeek(this.idIndicator, this.selectedYear, this.selectedWeek);

    } else if (this.isSpecificMonthSelected) {
      this.goal$ = this.service.getGoalYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);

    } else if (this.isSpecificTrimesterSelected) {
      this.goal$ = this.service.getGoalYearTrimester(this.idIndicator, this.selectedYear, this.selectedTrimester);

    } else if (this.isSpecificYearSelected) {
      this.goal$ = this.service.getGoalYear(this.idIndicator, this.selectedYear);

    } else {
      this.goal$ = this.service.getGoal(this.idIndicator);
    }
  }

  // Called when the dropdown of filters by date changes
  updateObservables(event) {
    this.updateDropdownDateFiltersValues(event);

    // Verify dropdown selection bottom-up (from week to year)
    if (this.isSpecificWeekSelected) {
      this.updateObservablesSpecificWeek();

    } else if (this.isSpecificMonthSelected) {
      this.updateObservablesSpecificMonth();

    } else if (this.isSpecificTrimesterSelected) {
      this.updateObservablesSpecificTrimester();

    } else if (this.isSpecificYearSelected) {
      this.updateObservablesSpecificYear();

    } else {
      this.updateObservablesAllYears();
    }
  }

  updateDropdownDateFiltersValues(event) {
    this.isSpecificYearSelected = event.isSpecificYearSelected;
    this.isSpecificTrimesterSelected = event.isSpecificTrimesterSelected;
    this.isSpecificMonthSelected = event.isSpecificMonthSelected;
    this.isSpecificWeekSelected = event.isSpecificWeekSelected;
    this.selectedYear = event.selectedYear;
    this.selectedTrimester = event.selectedTrimester;
    this.selectedMonth = event.selectedMonth;
    this.selectedWeek = event.selectedWeek;
  }

  updateObservablesAllYears() {
    this.indicator$ = this.service.getIndicator(this.idIndicator);
    this.value$ = this.service.calculateSpecificIndicator(this.idIndicator);
    this.goal$ = this.service.getGoal(this.idIndicator);
  }

  updateObservablesSpecificYear() {
    this.indicator$ = this.service.getIndicatorYear(this.idIndicator, this.selectedYear);
    this.value$ = this.service.calculateSpecificIndicatorYear(this.idIndicator, this.selectedYear);
    this.goal$ = this.service.getGoalYear(this.idIndicator, this.selectedYear);
  }

  updateObservablesSpecificTrimester() {
    this.indicator$ = this.service.getIndicatorYearTrimester(this.idIndicator, this.selectedYear, this.selectedTrimester);
    this.value$ = this.service.calculateSpecificIndicatorYearTrimester(this.idIndicator, this.selectedYear, this.selectedTrimester);
    this.goal$ = this.service.getGoalYearTrimester(this.idIndicator, this.selectedYear, this.selectedTrimester);
  }

  updateObservablesSpecificMonth() {
    this.indicator$ = this.service.getIndicatorYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);
    this.value$ = this.service.calculateSpecificIndicatorYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);
    this.goal$ = this.service.getGoalYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);
  }

  updateObservablesSpecificWeek() {
    this.indicator$ = this.service.getIndicatorYearWeek(this.idIndicator, this.selectedYear, this.selectedWeek);
    this.value$ = this.service.calculateSpecificIndicatorYearWeek(this.idIndicator, this.selectedYear, this.selectedWeek);
    this.goal$ = this.service.getGoalYearWeek(this.idIndicator, this.selectedYear, this.selectedWeek);
  }
}
