import { Component, OnInit } from '@angular/core';
import { Indicator } from '../../shared/indicator';
import { IndicatorType } from '../../shared/indicatorType';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
})
export class IndicatorDetailComponent implements OnInit {

  public model : Indicator;

  constructor() { // delete this
    this.model = new Indicator("Indicador que indica", IndicatorType.PercentIndicatorCalculator);
    this.model.addRegistry(new Date(1996,6,25),"nombre de registro","#");
  }

  ngOnInit() {
  }

}