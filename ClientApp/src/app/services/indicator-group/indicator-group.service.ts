import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Angular models from shared
import { Indicator } from '../../shared/models/indicator';
import { IndicatorGroup } from '../../shared/models/indicatorGroup';

@Injectable()
export class IndicatorGroupService {

  public static API_URL = 'api/IndicatorGroups/';

  constructor(public http: HttpClient) { }

  getIndicatorGroups(): Observable<IndicatorGroup[]> {
    return this.http.get<IndicatorGroup[]>(IndicatorGroupService.API_URL);
  }

  getIndicatorGroup(indicatorGroupId: number | string): Observable<IndicatorGroup> {
    return this.http.get<IndicatorGroup>(IndicatorGroupService.API_URL + indicatorGroupId);
  }

}
