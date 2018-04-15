import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-calcular-mostrar-indicador1-e',
  templateUrl: './calcular-mostrar-indicador1-e.component.html',
  styleUrls: ['./calcular-mostrar-indicador1-e.component.css']
})
export class CalcularMostrarIndicador1EComponent implements OnInit {
  name = "Calculo de Indicador 1E";
  descripcion = "Nº de actvidades de difusión en la que el CET participa";
 
  public indicador: Indicador;

  

  constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/CalcularMostrar1E/GetIndicador1E').subscribe(result => {
            this.indicador = result.json() as Indicador;
        }, error => console.error(error));
    }

  ngOnInit() {
  }

}

interface Indicador
{
  id : number;
  titulo : string;
  descripcion :  string; 
  recursos : Recursos[];
}


interface Recursos{
  id : number;
  titulo : string;
  link : string;

}