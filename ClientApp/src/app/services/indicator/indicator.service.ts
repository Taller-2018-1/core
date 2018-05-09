import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Angular models from shared
import { Indicator } from '../../shared/models/indicator';
import { IndicatorType } from '../../shared/models/indicatorType';
import { Registry } from '../../shared/models/registry';
import { Router } from '@angular/router';


@Injectable()
export class IndicatorService {

    public static BASE_URL = 'api/Indicators';

    public static INDICATORS_API = '/api/Indicators/';
    public static REGISTRIES_API = '/api/Registries/';
    public static PERCENT_REGISTRY = '/PercentRegistry';
    public static ACTIVITY_REGISTRY = '/ActivityRegistry';
    public static QUANTITY_REGISTRY = '/QuantityRegistry';
    public static LINK_REGISTRY = '/LinkRegistry';
    public static DEFAULT_REGISTRY = '/DefaultRegistry/';

    constructor(public http: HttpClient) { }

    getIndicator(indicatorId: number | string): Observable<Indicator> {
        return this.http.get<Indicator>(IndicatorService.INDICATORS_API + indicatorId);
    }

    calculateIndicators(): Observable<number[]> {
        return this.http.get<number[]>(IndicatorService.INDICATORS_API + 'Calculate');
    }

    addRegistry(registry: Registry, indicatorId: String, type: number) {
        let discriminator: string = IndicatorService.DEFAULT_REGISTRY;
        if (type === 1) {
            discriminator = IndicatorService.QUANTITY_REGISTRY;
        } else if (type === 2) {
            discriminator = IndicatorService.PERCENT_REGISTRY;
        } else if (type === 3) {
            alert("Tipo no definido");
        } else if (type === 4) {
            alert("Tipo no definido");
        }
        this.http.post<Indicator>(IndicatorService.REGISTRIES_API + indicatorId
            + discriminator, registry).subscribe();
    }
}
