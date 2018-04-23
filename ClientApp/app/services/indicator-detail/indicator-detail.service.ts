import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Indicator } from '../../shared/indicator';
import { IndicatorType } from '../../shared/indicatorType';
import { Registry } from '../../shared/registry';



@Injectable()
export class IndicatorDetailService {

  constructor(private http : Http) { }

  getIndicators(indicatorId : string, indicatorType : IndicatorType) : Observable<Indicator> {
    let apiUrl = 'api/Indicators/' + indicatorId;
    return this.http.get(apiUrl)
      .map(res => {
        return res.json().map((item : Indicator) => {
          return new Indicator(
            item.name,
            indicatorType
          );
        });
      });
  }
}
