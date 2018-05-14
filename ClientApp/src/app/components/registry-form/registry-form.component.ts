import { Component, OnInit, Input } from '@angular/core';
import { Indicator } from '../../shared/models/indicator';
import { IndicatorType } from '../../shared/models/indicatorType';
import { IndicatorService } from '../../services/indicator/indicator.service';
import { Registry } from '../../shared/models/registry';
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
    this.IndicatorService.addRegistry(this.model, this.idIndicator, this.indicator.registries[0].discriminator);
    this.indicator.registries.push(this.model);
    this.router.navigateByUrl('/indicator/' + this.idIndicator);
  }

  closeModal() {
    this.modalRef.hide();
    this.modalRef = null;
  }

  showFormControls(form: any) {
    return form && form.controls['name'] &&
      form.controls['name'].value; // Dr. IQ
  }

  constructor(router: Router, private IndicatorService: IndicatorService, private modalService: BsModalService) {
    this.model = new Registry();
    this.router = router;
  }

  private getIndicator(indicatorId: number) {
    this.IndicatorService.getIndicator(indicatorId).subscribe(
      data => { this.indicator = data; },
      err => console.error(err)
    );
  }
  ngOnInit() {
  }

}
