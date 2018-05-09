import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { PercentPipe } from '@angular/common';
import { Indicator } from '../../shared/models/indicator';
import { IndicatorType } from '../../shared/models/indicatorType';
import { Registry } from '../../shared/models/registry';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Services
import { IndicatorService } from '../../services/indicator/indicator.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions,  } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css'],
})
export class IndicatorDetailComponent implements OnInit {
  public indicator: Indicator = new Indicator();
  public idIndicator = -1;
  public registriesCount = 0;

  public registry: {registry: Registry, type: number};
  public editModalRef: BsModalRef;

  constructor(private service: IndicatorService,
    private route: ActivatedRoute,
    private modalService: BsModalService) {
    this.idIndicator = this.route.snapshot.params.idIndicator;
  }

  ngOnInit() {
    this.getIndicator(this.idIndicator);
  }

  openModalEditRegistry(template: TemplateRef<any>, registry: Registry) {
    this.registry = { registry: registry, type: this.indicator.type };
    this.editModalRef = this.modalService.show(template);
    
  }
  
  private getIndicator(indicatorId: number) {
    this.service.getIndicator(indicatorId).subscribe(
      data => {
      this.indicator = data;
      this.registriesCount = data.registries.length},
      err => console.error(err)
      );
  }

  /*private editRegistry(registry: Registry) {
    this.registry = { registry: registry, type: this.indicator.type };
  }*/

  private deleteRegistry (registry: Registry) {
    const date: Date = new Date(registry.date);
    const formatedDate: string = date.getDate() + '-' + (+date.getMonth() + 1) + '-' + date.getFullYear();
    const result = confirm('Está seguro que desea eliminar el registro: \n' + formatedDate + ' - ' + registry.name);

    if (result) {
      let removed: Registry;
      this.service.deleteRegistry(registry.registryID).subscribe(
        data => {
          removed = data;
          this.registriesCount--;},
        err => console.error(err)
      );

      const index: number = this.indicator.registries.indexOf(registry);
      if ( index !== -1) {
        this.indicator.registries.splice(index, 1);
      }
      console.log(this.indicator.registries);
    }
  }

}
