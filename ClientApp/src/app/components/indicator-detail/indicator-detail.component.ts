import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { Indicator } from '../../shared/models/indicator';
import { IndicatorType } from '../../shared/models/indicatorType';
import { IndicatorService } from '../../services/indicator/indicator.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions,  } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
})
export class IndicatorDetailComponent implements OnInit {
  
  public indicator: Indicator = new Indicator();
  public idIndicator = -1;

  constructor(private service: IndicatorService,
              private route: ActivatedRoute) {
    //this.getIndicator(5);
    this.idIndicator = this.route.snapshot.params.idIndicator;
    this.getIndicator(this.idIndicator);
  }

  ngOnInit() {
  
  }
 
  private getIndicator(indicatorId: number) {
    this.service.getIndicator(indicatorId).subscribe(
      data => { this.indicator = data; },
      err => console.error(err)
      );
  }

}
