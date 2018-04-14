import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-calcular-mostrar1-d',
  templateUrl: './calcular-mostrar1-d.component.html',
  styleUrls: ['./calcular-mostrar1-d.component.css']
})
export class CalcularMostrar1DComponent implements OnInit {

  public indicador1d: Indicador1D;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        
        http.get(baseUrl + 'api/CalcularMostrar1D/GetIndicador1D').subscribe(result => {
            this.indicador1d = result.json() as Indicador1D;
        }, error => console.error(error));


    }

  ngOnInit() {
  }

}


interface Indicador1D {
  id: string;
  titulo: string;
  descripcion : string;
  recursos : Recurso[];
}

interface Recurso{
  id : number;
}