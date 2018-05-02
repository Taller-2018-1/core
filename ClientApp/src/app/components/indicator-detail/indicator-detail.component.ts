import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { PercentPipe } from '@angular/common';
import { Indicator } from '../../shared/models/indicator';
import { IndicatorType } from '../../shared/models/indicatorType';
import { IndicatorService } from '../../services/indicator/indicator.service';
import { Registry } from '../../shared/models/registry';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions,  } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css'],
})
export class IndicatorDetailComponent implements OnInit {
  public indicator: Indicator = new Indicator();
  public idIndicator = -1;

  constructor(private service: IndicatorService,
              private route: ActivatedRoute) {
    this.idIndicator = this.route.snapshot.params.idIndicator;
  }

  ngOnInit() {
    this.getIndicator(this.idIndicator);
  }
  private getIndicator(indicatorId: number) {
    this.service.getIndicator(indicatorId).subscribe(
      data => { this.indicator = data; },
      err => console.error(err)
      );
  }

  private deleteRegistry(registry: Registry) {
    const date: Date = new Date(registry.date);
    const formatedDate: string = date.getDate() + '-' + (+date.getMonth() + 1) + '-' + date.getFullYear();
    const result = confirm('Está seguro que desea eliminar el registro: \n' + formatedDate + ' - ' + registry.name);

    if (result) {
      let removed: Registry;
      this.service.deleteRegistry(registry.registryID).subscribe(
        data => {removed = data; },
        err => console.error(err)
      );

      this.indicator.deleteRegistry(removed);
    }
  }

}
