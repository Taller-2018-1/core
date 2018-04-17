import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Registro1A } from '../../components/create1a/create1a.component';
import { getBaseUrl } from '../../app.browser.module';

@Injectable()
export class Create1aService {

    constructor(private http: Http) { }

    setRegistro1A(model: Registro1A): void {
        let apiUrl = getBaseUrl() + 'api/Indicator1A/SaveRegistro';
        this.http.post(apiUrl, model).subscribe();
    }
}
