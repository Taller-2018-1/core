import { Component, OnInit, Input } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

// Models
import { Indicator } from '../../../shared/models/indicator';
import { IndicatorGroup} from '../../../shared/models/indicatorGroup';
// Services
import { IndicatorGroupService} from '../../../services/indicator-group/indicator-group.service';
import {IndicatorService} from "../../../services/indicator/indicator.service";

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

  public newIndicator: Indicator;
  public groups: IndicatorGroup[];

  public selectedText: string = 'Cambiar el resultado esperado al que pertenece';
  public maxLength = 46; // The selectedText gets truncated on maxLength characters
                        // The indicatorGroup name show a few more characters
                        // Why 46? - Count the characters of selectedText

  constructor(service: IndicatorService, private indicatorGroupService: IndicatorGroupService) { }

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
    for (let ig of this.groups) {
      if (ig.name === this.selectedText) {
        this.newIndicator.indicatorGroupID = ig.indicatorGroupID;
      }
    }

    console.log(this.newIndicator);
    this.indicatorModalRef.hide();
  }

}
