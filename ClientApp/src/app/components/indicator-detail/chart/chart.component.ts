import { Component, OnInit, Input, DoCheck } from '@angular/core';

import {RegistryType} from '../../../shared/models/registryType';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() chartValues: number[];
  @Input() chartGoals: number[];
  @Input() chartLabels: string[];

  // Chart data
  selectedTypeChart: string;
  typesChart: string[] = [];

  RegistryType = RegistryType;

  lineChartData: Array<any> = [
    {data: [], label: 'Meta', type: 'line', lineTension: 0},
    {data: [], label: 'Valor', lineTension: 0}
  ];

  lineChartLabels: Array<any> = [];

  lineChartOptions: any = {
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

  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'transparent',
      borderColor: 'rgba(255, 87, 51)',
      pointBackgroundColor: 'rgba(255, 87, 51)',
      pointBorderColor: 'rgba(255, 87, 51)',
      pointHoverBackgroundColor: 'rgba(255, 87, 51)',
      pointHoverBorderColor: 'rgba(199, 0, 57)'
    },
    { // grey
      backgroundColor: 'rgba(96, 209, 242)',
      borderColor: 'rgba(62, 167, 198)',
      pointBackgroundColor: 'rgba(62, 167, 198)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgba(62, 167, 198)',
      pointHoverBorderColor: 'rgba(62, 167, 198)'
    }
  ];

  lineChartLegend = true;
  lineChartType = 'line';

  constructor() {
  }

  ngOnInit() {
    this.lineChartData[1].data = this.chartValues;
    this.lineChartData[0].data = this.chartGoals;
    this.lineChartLabels = this.chartLabels;
    this.selectedTypeChart = 'Gráfico de línea';
    this.typesChart = ['Gráfico de línea', 'Gráfico de barra'];
  }

  selectChart(type: string) {
    if (type === 'Gráfico de barra') {
      this.selectedTypeChart = 'Gráfico de barra';
      this.lineChartType = 'bar';
    } else if (type === 'Gráfico de línea') {
      this.selectedTypeChart = 'Gráfico de línea';
      this.lineChartType = 'line';
    }
  }

}
