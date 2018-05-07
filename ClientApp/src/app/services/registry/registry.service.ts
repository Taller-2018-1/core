import { Injectable } from '@angular/core';
import { Registry } from '../../shared/models/registry';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class RegistryService {

  private static BASE_URL = '/api/Registries/';

  constructor(private http: HttpClient) { }

  editRegistry(registry: Registry): Observable<Registry> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.put<Registry>(RegistryService.BASE_URL + registry.registryID, registry, { headers: headers })
      .pipe(
      retry(5) // retry a failed request up to 3 times, but don't handle errros
      );
  }
}
