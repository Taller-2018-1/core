import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Indicator } from '../../shared/indicator';
import { IndicatorType } from '../../shared/indicatorType';
import { Registry } from '../../shared/registry';
import { getBaseUrl } from '../../app.browser.module';



@Injectable()
export class IndicatorService {

  constructor(private http : Http) { }

    getIndicators(indicatorId: number): Observable<any> {
        let apiUrl = getBaseUrl() + 'api/Indicators/' + indicatorId;
        return this.http.get(apiUrl);
    }
  
}
