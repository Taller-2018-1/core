import { Component, OnInit, Input } from '@angular/core';

// Ngx-Bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Models
import { IndicatorGroup } from '../../../shared/models/indicatorGroup';

// Services
import { IndicatorGroupService } from '../../../services/indicator-group/indicator-group.service';

@Component({
  selector: 'app-indicator-group-form',
  templateUrl: './indicator-group-form.component.html',
  styleUrls: ['./indicator-group-form.component.css']
})
export class IndicatorGroupFormComponent implements OnInit {

  //modalRef: BsModalRef;
  @Input() modalRef: BsModalRef;

  @Input() indicatorGroups;

  public model: IndicatorGroup = new IndicatorGroup();

  constructor(private modalService: BsModalService, private service: IndicatorGroupService) { }

  ngOnInit() {
  }

  hideModal() {
    this.modalRef.hide();
  }

  onSubmit() {
    console.log(this.model);
  }
}
