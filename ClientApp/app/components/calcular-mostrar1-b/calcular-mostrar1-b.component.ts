import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-calcular-mostrar1-b',
  templateUrl: './calcular-mostrar1-b.component.html',
  styleUrls: ['./calcular-mostrar1-b.component.css']
})
export class CalcularMostrar1BComponent implements OnInit {
  public calculo: Calculo;

  constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/CalcularMostrar1B/Calculos').subscribe(result => {
        this.calculo = result.json() as Calculo;
    }, error => console.error(error));
}

  ngOnInit() {
  }

}

interface Calculo {
  largo: number;

}
