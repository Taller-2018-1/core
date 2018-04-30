import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Angular models from shared
import { Registry } from '../../shared/models/registry';

@Injectable()
export class RegistryService {
  public static BASE_URL = `api/Registries`;

  public static REGISTRIES_API = '/api/Registries/';
  public static ADD_FILE_DOCUMENT_METHOD = "/AddFileDocument";
  public static ADD_LINK_DOCUMENT_METHOD = "/AddLinkDocument";

  constructor(public http: HttpClient) { }

  getRegistry(registryId: number): Observable<Registry> {
      return this.http.get<Registry>(RegistryService.REGISTRIES_API + registryId);
  }


  addLinkDocument(document: String, registryId: number) {
    this.http.post<Registry>(RegistryService.REGISTRIES_API + registryId
      + RegistryService.ADD_LINK_DOCUMENT_METHOD, document ).subscribe();
  }
  /*
  addFileDocument(document: Registry, registryId: number) {
      this.http.post<Registry>(RegistryService.REGISTRIES_API + registryId
        + RegistryService.ADD_FILE_DOCUMENT_METHOD, document ).subscribe();
  }*/
}
