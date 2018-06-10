import { Component, Inject, OnInit, HostBinding,TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Model
import { IndicatorGroup } from '../../shared/models/indicatorGroup';

// Service
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';

// Ngx-Bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as jsPDF from 'jspdf';

@Component(
{
  selector: 'app-result-home',
  templateUrl: './result-home.component.html',
  styleUrls: ['./result-home.component.css']
})
export class ResultHomeComponent implements OnInit {
  @HostBinding('class') classes = 'wrapper'; // This adds a class to the host container

  public indicatorGroups$: Observable<IndicatorGroup[]>;

  modalRef: BsModalRef;
  @ViewChild('content') content: ElementRef;
  


  constructor(private service: IndicatorGroupService,private modalService: BsModalService) {
  }

  ngOnInit() {
    this.indicatorGroups$ = this.service.getIndicatorGroups();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  downloadPDF(){
    let doc = new jsPDF();

      let specialElementHandlers = {
          '#editor': function(element, renderer){
            return true;
          }
      };

      let content = this.content.nativeElement;

      doc.fromHTML(content.innerHTML, 15, 15, {
        'with':190,
        'elementHandlers':specialElementHandlers
      });

      doc.save('test.pdf');

  }


}
