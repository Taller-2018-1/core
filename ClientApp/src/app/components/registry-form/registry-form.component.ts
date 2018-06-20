import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Indicator } from '../../shared/models/indicator';
import { IndicatorService } from '../../services/indicator/indicator.service';
import { Registry } from '../../shared/models/registry';
import { RegistryType } from '../../shared/models/registryType';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.css']
})
export class RegistryFormComponent implements OnInit {

  model: Registry;
  router: Router;
  @Input() modalRef: BsModalRef;
  @Input() idIndicator;
  @Input() indicator: Indicator;

  onSubmit() {
    let nameVerification: boolean = false;

    this.indicatorService.registryNameExists(this.idIndicator,this.model.name).subscribe((data) => {
      nameVerification = data;
    });

    if(nameVerification) {
      this.indicatorService.addRegistry(this.model, this.idIndicator, RegistryType[this.indicator.registriesType]);
      this.indicator.registries.push(this.model);
    } else {
      this.duplicateNameAlert();
    }


  }

  closeModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  constructor(router: Router, private indicatorService: IndicatorService, private modalService: BsModalService) {
    this.model = new Registry();
    this.router = router;
  }

  private getIndicator(indicatorId: number) {
    this.indicatorService.getIndicator(indicatorId).subscribe(
      data => { this.indicator = data; },
      err => console.error(err)
    );
  }
  ngOnInit() {
  }

  private duplicateNameAlert()
  {
    alert("El nuevo registro no ha logrado ser añadido.\nYa existe un registro con el nombre: " + this.model.name);
  }
}
