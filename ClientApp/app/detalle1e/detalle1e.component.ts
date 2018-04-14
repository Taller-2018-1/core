import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-detalle1e',
  templateUrl: './detalle1e.component.html',
  styleUrls: ['./detalle1e.component.css']
})
export class Detalle1eComponent implements OnInit {

    public registros: Registro1E[]; 

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/Indicador1E/LoadRegistro1E').subscribe(result => {
            this.registros = result.json() as Registro1E[];
        }, error => console.error(error));
    }

  ngOnInit() {
  }

}

interface Registro1E {
    data: string;
    name: string;
    source: string;
}
