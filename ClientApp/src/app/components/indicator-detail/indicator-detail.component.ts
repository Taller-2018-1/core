import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, TemplateRef  } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Models
import { Indicator } from '../../shared/models/indicator';
import { IndicatorType } from '../../shared/models/indicatorType';
import { Router } from '@angular/router';

// Services
import { IndicatorService } from '../../services/indicator/indicator.service';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
})
export class IndicatorDetailComponent implements OnInit {

  public indicator$: Observable<Indicator>;
  public indicator: Indicator = new Indicator();
  private idIndicator = -1;   // Variable that will hold the value of the indicator's ID
  router: Router;
  
  modalRef: BsModalRef;

  constructor(router: Router, private route: ActivatedRoute, private service: IndicatorService, private modalService: BsModalService) {
    // Obtain the indicator's ID from the url (Eg: localhost:5000/indicator/1)
    this.idIndicator = this.route.snapshot.params.idIndicator;
    this.router = router;
  }

  ngOnInit() {
    // Load the details of the specific indicator (using its ID)
    this.indicator$ = this.service.getIndicator(this.idIndicator);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private getIndicator(indicatorId: number) {
    this.service.getIndicator(indicatorId).subscribe(
      data => { this.indicator = data; },
      err => console.error(err)
    );
  }

  gotoAddRegistry() {
    this.router.navigateByUrl('/indicator-add-registry');
  }

  gotoRegistry() {
    this.router.navigateByUrl('/registry-details/' + 1); //Reemplazar por ID, sacado del button
  }
  get diagnostric(){return JSON.stringify(this.indicator.registries)}


}

