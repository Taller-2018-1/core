import { Injectable } from '@angular/core';
import { Registry } from '../../shared/models/registry';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class RegistryService {

  private static BASE_URL = '/api/Registries/';
  private static DEFAULT = '/DefaultRegistry';
  private static QUANTITY = '/QuantityRegistry'
  private static PERCENT = '/PercentRegistry';
  private static LINK = '/LinkRegistry';
  private static ACTIVITY = '/ActivityRegistry';

  constructor(private http: HttpClient) { }

  editRegistry(registry: Registry, type: number): Observable<Registry> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    
    let discriminator: string = RegistryService.DEFAULT;
    if (type === 1) {
      discriminator = RegistryService.QUANTITY;
    } else if (type === 2) {
      discriminator = RegistryService.PERCENT;
    } else if (type === 3) {
      alert("Tipo no definido");
    } else if (type === 4) {
      alert("Tipo no definido");
    }


    return this.http.put<Registry>(RegistryService.BASE_URL + registry.registryID + discriminator, registry, { headers: headers })
      .pipe(
      retry(5) // retry a failed request up to 3 times, but don't handle errros
      );
  }
}
