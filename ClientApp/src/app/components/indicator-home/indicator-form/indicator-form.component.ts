import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

// Models
import { Indicator } from '../../../shared/models/indicator';

// Services
import { IndicatorService} from "../../../services/indicator/indicator.service";

import swal from 'sweetalert2';

@Component({
  selector: 'app-indicator-form',
  templateUrl: './indicator-form.component.html',
  styleUrls: ['./indicator-form.component.css']
})
export class IndicatorFormComponent implements OnInit {

  @Input() modalRef: BsModalRef;

  @Output()
  private udpateEvent = new EventEmitter();

  public model: Indicator;

  constructor(private modalService: BsModalService,
              private service: IndicatorService) { }

  ngOnInit() {
  }

  hideModal() {
    this.modalRef.hide();
  }

  onSubmit() {
    console.log("submited");
  }

  private duplicateNameAlert()
  {
    swal({
      title: 'Error al agregar el grupo de indicadores',
      //text: 'Ya existe un registro con el nombre ' + this.model.name,
      html: '<h6> Ya existe un grupo de indicadores con el nombre "' + this.model.name + '"</h6>',
      type: 'warning',
      confirmButtonText: 'Aceptar',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-sm btn-primary',
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }
}
