import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

import { BsModalRef } from 'ngx-bootstrap/modal';

// Models
import { Indicator } from '../../../shared/models/indicator';
import { IndicatorGroup} from '../../../shared/models/indicatorGroup';
// Services
import { IndicatorGroupService } from '../../../services/indicator-group/indicator-group.service';
import { IndicatorService } from '../../../services/indicator/indicator.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-indicator-editor',
  templateUrl: './indicator-editor.component.html',
  styleUrls: ['./indicator-editor.component.css']
})
export class IndicatorEditorComponent implements OnInit {

  @Input()
  public indicatorModalRef: BsModalRef;

  @Input()
  public indicator: Indicator;

  @Output()
  updateInfo = new EventEmitter();

  public newIndicator: Indicator;
  public groups: IndicatorGroup[];

  public selectedText = 'Cambiar el resultado esperado al que pertenece';
  public maxLength = 46; // The selectedText gets truncated on maxLength characters
                        // The indicatorGroup name show a few more characters
                        // Why 46? - Count the characters of selectedText

  constructor(private service: IndicatorService,
              private indicatorGroupService: IndicatorGroupService,
              private router: Router) { }

  ngOnInit() {
    this.newIndicator = JSON.parse(JSON.stringify(this.indicator)); // Create a clone of the original Indicator.
    const groupId = this.indicator.indicatorGroupID;

    this.indicatorGroupService.getIndicatorGroups().subscribe(data => {
      this.groups = data;
    });


  }

  updateSelected(value: string) {
    this.selectedText = value;
  }

  onSubmit() {
    let moved = false;
    for (let ig of this.groups) {
      if (ig.name === this.selectedText) {
        if (ig.indicatorGroupID !== this.newIndicator.indicatorGroupID) { // Moved to another IndicatorGroup
          moved = true;
        }
        this.newIndicator.indicatorGroupID = ig.indicatorGroupID;

      }
    }

    this.service.editIndicator(this.newIndicator).subscribe(data => {
      if (data) {
        if (moved) {
          this.router.navigateByUrl('/indicatorGroup/' + this.newIndicator.indicatorGroupID );
        } else {
          this.updateInfo.emit('Indicator updated');
          // this.router.navigateByUrl('/indicatorGroup/' + this.newIndicator.indicatorGroupID ); // I'll find a better way
        }
      } else {
        this.duplicateNameAlert();
      }


    });
    this.indicatorModalRef.hide();
  }

  private duplicateNameAlert() {
    swal({
      title: 'Error al editar el indicador',
      html: '<h6> Ya existe un indicador con el nombre "' + this.newIndicator.name + '"</h6>',
      type: 'warning',
      confirmButtonText: 'Aceptar',
      buttonsStyling: false,
      confirmButtonClass: 'btn btn-sm btn-primary',
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

}
