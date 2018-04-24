import { Component, OnInit, Inject } from '@angular/core';
import { Indicator } from '../../shared/indicator';
import { IndicatorType } from '../../shared/indicatorType';
import { IndicatorService } from '../../services/indicator/indicator.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css'],
  providers: [IndicatorService]
})
export class IndicatorDetailComponent implements OnInit {

  public model: Indicator;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Indicator>(baseUrl + 'api/Indicators/1').subscribe(result => {
      this.model = result;
    }, error => console.error(error));
  }

  ngOnInit() {
  }

}
