import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Angular models from shared
import { Indicator } from '../../shared/models/indicator';
import { Registry } from '../../shared/models/registry';
import { Router } from '@angular/router';


@Injectable()
export class IndicatorService {

  public static BASE_URL = 'api/Indicators';

  public static INDICATORS_API = '/api/Indicators/';
  public static GOALS_API = '/api/Indicators/Goals/';
  public static REGISTRIES_API = '/api/Registries/';
  public static PERCENT_REGISTRY = '/PercentRegistry';
  public static ACTIVITY_REGISTRY = '/ActivityRegistry';
  public static QUANTITY_REGISTRY = '/QuantityRegistry';
  public static LINK_REGISTRY = '/LinkRegistry';
  public static DEFAULT_REGISTRY = '/DefaultRegistry/';

  constructor(public http: HttpClient) { }

  getIndicator(indicatorId: number): Observable<Indicator> {
    return this.http.get<Indicator>(IndicatorService.INDICATORS_API + indicatorId);
  }

  getIndicatorYearRegistries(indicatorId: number, year: number): Observable<Indicator> {
    return this.http.get<Indicator>(IndicatorService.INDICATORS_API + indicatorId + '/' + year);
  }

  getIndicatorYearMonthRegistries(indicatorId: number, year: number, month: number): Observable<Indicator> {
    return this.http.get<Indicator>(IndicatorService.INDICATORS_API + indicatorId + '/' + year + '/' + month);
  }

  getGoal(indicatorId: number): Observable<number>
  {
    return this.http.get<number>(IndicatorService.GOALS_API + indicatorId);
  }
  getGoalYear(indicatorId: number, year: number): Observable<number>
  {
    return this.http.get<number>(IndicatorService.GOALS_API + indicatorId+ '/' + year);
  }
  getGoalYearMonth(indicatorId: number, year: number, month: number): Observable<number>
  {
    return this.http.get<number>(IndicatorService.GOALS_API + indicatorId + '/' + year + '/' + month);
  }

  calculateIndicators(): Observable<number[]> {
    return this.http.get<number[]>(IndicatorService.INDICATORS_API + 'Calculate');
  }

  addRegistry(registry: Registry, indicatorId: String, registriesType: string) {
    let discriminator: string = IndicatorService.DEFAULT_REGISTRY;
    if (registriesType === 'QuantityRegistry') {
        discriminator = IndicatorService.QUANTITY_REGISTRY;
    } else if (registriesType === 'PercentRegistry') {
        discriminator = IndicatorService.PERCENT_REGISTRY;
    } else if (registriesType === 'ActivityRegistry') {
        discriminator = IndicatorService.ACTIVITY_REGISTRY;
    } else if (registriesType === 'LinkRegistry') {
        discriminator = IndicatorService.LINK_REGISTRY;
    }
    this.http.post<Indicator>(IndicatorService.REGISTRIES_API + indicatorId
        + discriminator, registry).subscribe();
  }

  deleteRegistry(registry: Registry): Observable<Registry> {
    return this.http.delete<Registry>(IndicatorService.REGISTRIES_API + registry.registryID);
  }

  calculateIndicatorsYear(year: number): Observable<number[]> {
    return this.http.get<number[]>(IndicatorService.INDICATORS_API + 'Calculate/' + year);
  }
  
}
