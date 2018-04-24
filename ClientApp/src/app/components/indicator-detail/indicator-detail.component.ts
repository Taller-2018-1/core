import { Component, OnInit } from '@angular/core';
import { Indicator } from '../../shared/indicator';
import { IndicatorType } from '../../shared/indicatorType';
import { IndicatorService } from '../../services/indicator/indicator.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';  

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
})
export class IndicatorDetailComponent implements OnInit {
    
  public model : Indicator;
  
    constructor(public http: Http, private service: IndicatorService) {
        service.getIndicators(1).subscribe(result => {
            this.model = result.json();
        }, error => console.error(error));
  }

  ngOnInit() {
  }

}