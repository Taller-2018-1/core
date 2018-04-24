/* Componente encargado de mostrar los detalles del Indicador 1A
 * (Vinculación con entidades nacionales e internacionales -
 * Nº de Nuevas entidades internacionales vinculadas al CET)
 * A través de una tabla, la cual muestra la fecha, nombre  de la
 * entidad y un enlace a documento de respaldo.
 */

import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Detail1aService } from '../../services/detail1a/detail1a.service';
import { getBaseUrl } from '../../app.browser.module';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'detail1a',
  templateUrl: './detail1a.component.html',
  providers: [Detail1aService],
  styleUrls: ['./detail1a.component.css']
})
export class Detail1aComponent implements OnInit {
  //public numberOfEntities: NumberOfEntities;
  public indicator1A: Indicator1A;
  public showDetail: boolean;

  // Variable con la lista de información mostrar (sobre los detalles)
  public details: Observable<Detail1a[]> = new Observable();

  constructor(private service: Detail1aService) {
  }
  /*constructor(private service: Detail1aService, http: Http, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/Indicator1A/GetNumberOfEntities').subscribe(result => {
      this.number = result.json() as NumberOfEntities;
    }, error => console.error(error));
  }*/



  ngOnInit() {
    this.indicator1A = this.getIndicator();
    this.details = this.getDetails();
  }

  // Función que obtiene los detalles de manera asincrona desde el servicio.
  getDetails(): Observable<Detail1a[]> {
    return this.service.getDetails();
  }

  getIndicator(): Indicator1A {
    this.service.getIndicator1A().subscribe(
      indicator1A => {
        this.indicator1A = indicator1A
      }
    );
    return this.indicator1A
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

}

// Clase utilizada para cargar los datos a mostrar 
// (fecha, nombre de entidad y url al documento de respando)
// También es utilizada por el servicio detail1a.service.
export class Detail1a {
  date: string;
  name: string;
  documenturl: string;

  constructor(date: string, name: string, documenturl: string) {
    this.date = date;
    this.name = name;
    this.documenturl = documenturl;
  }
}

export class Indicator1A {
  id: string;
  title: string;
  description: string;
  resources: Resource[];

  constructor(id: string, title: string, description: string, resources: Resource[]) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.resources = resources;
  }

}

export class Resource {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

}



