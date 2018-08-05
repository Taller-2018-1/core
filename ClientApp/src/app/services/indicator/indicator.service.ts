import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Angular models from shared
import { Indicator } from '../../shared/models/indicator';
import { Registry } from '../../shared/models/registry';
import { Router } from '@angular/router';
import { Goal } from '../../shared/models/goal';
import { LoaderService } from '../loader/loader.service';


@Injectable()
export class IndicatorService {

  public static BASE_URL = 'api/Indicators';

  public static INDICATORS_API = '/api/Indicators/';
  public static GOALS_API = '/api/Indicators/Goals/';
  public static GOALSLIST = '/GoalsList';
  public static GOAL = 'Goal';
  public static CALCULATE_API = '/api/Indicators/Calculate/';
  public static REGISTRIES_API = '/api/Registries/';
  public static PERCENT_REGISTRY = '/PercentRegistry';
  public static QUANTITY_REGISTRY = '/QuantityRegistry';
  public static DEFAULT_REGISTRY = '/DefaultRegistry/';
  public static REGISTRY_NAME_VERIFICATION = '/RegistryNameExists';

  constructor(public http: HttpClient) { }

  getIndicator(indicatorId: number): Observable<Indicator> {
    return this.http.get<Indicator>(IndicatorService.INDICATORS_API + indicatorId);
  }

  getIndicators(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(IndicatorService.INDICATORS_API);
  }

  getIndicatorYearRegistries(indicatorId: number, year: number): Observable<Indicator> {
    return this.http.get<Indicator>(IndicatorService.INDICATORS_API + indicatorId + '/' + year);
  }

  getIndicatorYearMonthRegistries(indicatorId: number, year: number, month: number): Observable<Indicator> {
    return this.http.get<Indicator>(IndicatorService.INDICATORS_API + indicatorId + '/' + year + '/' + month);
  }

  getIndicatorValue(indicatorId: number): Observable<number> {
    return this.http.get<number>(IndicatorService.CALCULATE_API + indicatorId);
  }

  getIndicatorValueYear(indicatorId: number, year: number): Observable<number> {
    return this.http.get<number>(IndicatorService.CALCULATE_API + indicatorId + '/' + year);
  }

  getIndicatorValueYearMonth(indicatorId: number, year: number, month: number): Observable<number> {
    return this.http.get<number>(IndicatorService.CALCULATE_API + indicatorId + '/' + year + '/' + month);
  }

  getGoal(indicatorId: number): Observable<number> {
    return this.http.get<number>(IndicatorService.GOALS_API + indicatorId);
  }

  getGoalYear(indicatorId: number, year: number): Observable<number> {
    return this.http.get<number>(IndicatorService.GOALS_API + indicatorId + '/' + year);
  }

  getGoalYearMonth(indicatorId: number, year: number, month: number): Observable<number> {
    return this.http.get<number>(IndicatorService.GOALS_API + indicatorId + '/' + year + '/' + month);
  }

  calculateIndicators(): Observable<number[]> {
    return this.http.get<number[]>(IndicatorService.INDICATORS_API + 'Calculate');
  }

  addRegistry(registry: Registry, indicatorId: String, registriesType: string): Observable<Registry> {
    let discriminator: string = IndicatorService.DEFAULT_REGISTRY;
    if (registriesType === 'QuantityRegistry') {
        discriminator = IndicatorService.QUANTITY_REGISTRY;
    } else if (registriesType === 'PercentRegistry') {
        discriminator = IndicatorService.PERCENT_REGISTRY;
    }
    return this.http.post<Registry>(IndicatorService.REGISTRIES_API + indicatorId
        + discriminator, registry);
  }

  deleteRegistry(registry: Registry): Observable<Registry> {
    return this.http.delete<Registry>(IndicatorService.REGISTRIES_API + registry.registryID);
  }

  calculateIndicatorsYear(year: number): Observable<number[]> {
    return this.http.get<number[]>(IndicatorService.INDICATORS_API + 'Calculate/' + year);
  }

  getGoalsList(indicatorId: number): Observable<Goal[]> {
    return this.http.get<Goal[]>(IndicatorService.INDICATORS_API + indicatorId + IndicatorService.GOALSLIST);
  }

  postGoals(indicatorId: number, goals: Goal[]): Observable<Goal[]> {
    return this.http.post<Goal[]>(IndicatorService.INDICATORS_API + indicatorId + IndicatorService.GOALSLIST, goals);
  }

  putGoal(goal: Goal) {
    this.http.put(IndicatorService.INDICATORS_API + IndicatorService.GOAL + '/' + goal.goalID, goal).subscribe();
  }

  addIndicator(indicator: Indicator): Observable<any> {
    return this.http.post<any>(IndicatorService.INDICATORS_API, indicator);
  }
}
