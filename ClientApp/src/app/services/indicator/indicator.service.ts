import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Angular models from shared
import { Indicator } from '../../shared/indicator';
import { IndicatorType } from '../../shared/indicatorType';
import { Registry } from '../../shared/registry';


@Injectable()
export class IndicatorService {

    public static BASE_URL = `api/Indicators`;

    public static INDICATOR_1A = '/api/Indicators';

    constructor(public http: HttpClient) { }

    getIndicator(indicatorId: number): Observable<Indicator> {
        return this.http.get<Indicator>(IndicatorService.INDICATOR_1A);
    }
}
