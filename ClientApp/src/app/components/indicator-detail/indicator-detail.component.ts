import { Component, OnInit, Inject } from '@angular/core';
import { Indicator } from '../../shared/models/indicator';
import { IndicatorType } from '../../shared/models/indicatorType';
import { IndicatorService } from '../../services/indicator/indicator.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
})
export class IndicatorDetailComponent implements OnInit {

  public indicator: Indicator = new Indicator();
  router: Router;

  constructor(router: Router, private service: IndicatorService) {
    this.getIndicator(4);
    this.router = router;
  }

  ngOnInit() {
  }

  private getIndicator(indicatorId: number) {
    this.service.getIndicator(indicatorId).subscribe(
      data => { this.indicator = data; },
      err => console.error(err)
    );
  }

  gotoAddRegistry() {
    this.router.navigateByUrl('/indicator-add-registry');
  }
}
