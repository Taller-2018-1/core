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
    // this.IndicatorService.addRegistry(this.model,this.idIndicator); //Reemplazar por ID
    this.service.addRegistry(this.model, this.idIndicator, RegistryType[this.indicator.registriesType]);
    this.indicator.registries.push(this.model);
    this.router.navigateByUrl('/indicator/' + this.idIndicator);
  }

  closeModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  constructor(router: Router, private service: IndicatorService, private modalService: BsModalService) {
    this.model = new Registry();
    this.router = router;

  }

  ngOnInit() {
  }

}
