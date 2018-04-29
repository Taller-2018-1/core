import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Angular models from shared
import { Registry } from '../../shared/models/registry';

@Injectable()
export class RegistryService {
  public static BASE_URL = `api/Registries`;

  public static REGISTRIES_API = '/api/Registries/';
  public static ADD_DOCUMENT_METHOD = "/AddDocument";

  constructor(public http: HttpClient) { }

  getRegistry(registryId: number): Observable<Registry> {
      return this.http.get<Registry>(RegistryService.REGISTRIES_API + registryId);
  }

  /*
  addRegistry(registry: Registry, indicatorId: number) {
      this.http.post<Indicator>(IndicatorService.INDICATORS_API + indicatorId
        + IndicatorService.ADD_REGISTRY_METHOD, registry ).subscribe();
  }
  */
}
