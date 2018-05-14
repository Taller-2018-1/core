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
  public static PERCENT_REGISTRY = '/PercentRegistry';
  public static ACTIVITY_REGISTRY = '/ActivityRegistry';
  public static QUANTITY_REGISTRY = '/QuantityRegistry';
  public static LINK_REGISTRY = '/LinkRegistry';
  public static DEFAULT_REGISTRY = '/DefaultRegistry/';
    
    public static REGISTRIES_API = '/api/Registries/';

  constructor(public http: HttpClient) { }

  getIndicator(indicatorId: number): Observable<Indicator> {
    return this.http.get<Indicator>(IndicatorService.INDICATORS_API + indicatorId);
  }

  addRegistry(registry: Registry, indicatorId: String, type: string) {
    let discriminator: string = IndicatorService.DEFAULT_REGISTRY;
    if (type === "LinkRegistry") {
      discriminator = IndicatorService.LINK_REGISTRY;
    }
    this.http.post<Indicator>(IndicatorService.REGISTRIES_API + indicatorId
      + discriminator, registry).subscribe();
  }

  deleteRegistry(registryId: number): Observable<Registry> {
    return this.http.delete<Registry>(IndicatorService.REGISTRIES_API + registryId);
  }

  calculateIndicators(): Observable<number[]> {
    return this.http.get<number[]>(IndicatorService.INDICATORS_API + 'Calculate');
  }

  calculateIndicatorsYear(year: number): Observable<number[]> {
    return this.http.get<number[]>(IndicatorService.INDICATORS_API + 'Calculate/' + year);
  }
}
