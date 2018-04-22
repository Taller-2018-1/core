/* Componente encargado de mostrar los detalles del Indicador 1A
 * (Vinculación con entidades nacionales e internacionales -
 * Nº de Nuevas entidades internacionales vinculadas al CET)
 * A través de una tabla, la cual muestra la fecha, nombre  de la
 * entidad y un enlace a documento de respaldo.
 */

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Detail1A } from '../../model';
import { Indicator1Service } from '../../services';

@Component({
  selector: 'app-indicator1-detail1a',
  templateUrl: './detail1a.component.html',
  styleUrls: ['./detail1d.component.css']
})
export class Detail1AComponent implements OnInit {

  public details: Observable<Detail1A[]>;

  constructor(private indicator1Service: Indicator1Service) {
  }

  ngOnInit() {
    this.details = this.indicator1Service.getDetails1B();
  }
}
