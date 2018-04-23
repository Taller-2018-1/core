import { Component, OnInit } from '@angular/core';
import { Indicator } from '../../shared/indicator';
import { IndicatorType } from '../../shared/indicatorType';
import { IndicatorDetailService } from '../../services/indicator-detail/indicator-detail.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
})
export class IndicatorDetailComponent implements OnInit {

  //public model : Observable<Indicator>;
  public model : Indicator;
  
  constructor(private service : IndicatorDetailService) { // DELETE THIS
    //this.model = {};
    this.model = new Indicator("Indicador que indica", IndicatorType.PercentIndicatorCalculator);
    this.model.addRegistry(new Date(1996,6,25),"nombre de registro","#");
    
    //service.getIndicators("1E", IndicatorType.QuantityIndicatorCalculator).map((item : any) => {
    //  this.model = item;
    //});
  }

  ngOnInit() {
  }

}