import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Angular models from shared
import { Indicator } from '../../shared/models/indicator';
import { IndicatorType } from '../../shared/models/indicatorType';
import { Registry } from '../../shared/models/registry';


@Injectable()
export class IndicatorService {

    public static BASE_URL = `api/Indicators`;

    public static INDICATORS_API = '/api/Indicators/';

    constructor(public http: HttpClient) { }

    getIndicator(indicatorId: number | string): Observable<Indicator> {
        return this.http.get<Indicator>(IndicatorService.INDICATORS_API + indicatorId);
    }

    calculateIndicators(): Observable<number[]> {
        return this.http.get<number[]>(IndicatorService.INDICATORS_API + 'Calculate');
    }
}
