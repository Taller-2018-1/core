import { Component, Inject, OnInit, HostBinding,TemplateRef, ElementRef, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Model
import { IndicatorGroup } from '../../shared/models/indicatorGroup';
import { Indicator } from '../../shared/models/indicator';

// Service
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';
import { IndicatorService } from '../../services/indicator/indicator.service';


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
  indicatorID: number;
  @HostBinding('class') classes = 'wrapper'; // This adds a class to the host container

  public indicatorGroups$: Observable<IndicatorGroup[]>;
  indicatorGroups : IndicatorGroup[];

  

  modalRef: BsModalRef;
  @ViewChild('content') content: ElementRef;
  
  //@Input() indicatorGroup: IndicatorGroup;

  selectedYear: number;

  goals$: Observable<number[]>;

  public indicator$: Observable<Indicator>;


  public indicators: Indicator[] = [];

  constructor(private service: IndicatorGroupService, private serviceIndicator: IndicatorService , private modalService: BsModalService) {

    
    this.service.getIndicatorGroup(1).subscribe(g => {
      g.indicators.forEach(indicator => {
        this.serviceIndicator.getIndicator(indicator.indicatorID).subscribe(i => {
          this.indicators.push(i);
          
        });
      });
    });

    console.log(this.indicators);


    this.indicators.forEach(indicator => {
      console.log(indicator);
      });
  }

  
  

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    this.indicatorGroups$ = this.service.getIndicatorGroups();

    
    //this.indicatorID=this.indicatorGroup.indicatorGroupID;
    //console.log("indicatorGroup"+this.indicatorGroups$);

    

    //this.goals$ = this.service.getGoalsYear(this.indicatorGroup.indicatorGroupID, this.selectedYear);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  

  cantidadMetaIndicatorGroup(indicatorGroups : IndicatorGroup[], j: number, y: number){
    this.indicatorGroups = indicatorGroups;
    let cantidad= 0;
    //console.log("j: "+j+" y: "+y);
    //console.log("J: "+j);
    //console.log("y: "+y);
    for(let i=0;i<12;i++)
    {
      if(j==0)
      {
        //console.log("indicatorGroup: "+ this.indicatorGroups[j].indicators[y].goals[i].value);
        //console.log("indicatorGroup registros: "+ this.indicatorGroups[j].indicators[y].registries.length);
        cantidad +=this.indicatorGroups[j].indicators[y].goals[i].value;
      }
    }
    //console.log("cantidad: "+ cantidad);
    return cantidad;
  }

  cantidadIndicatorGroup(indicatorGroups : IndicatorGroup[], j: number, y: number){
    this.indicatorGroups = indicatorGroups;
    let cantidad= 0;
    //console.log("j: "+j+" y: "+y);
    //console.log("J: "+j);
    //console.log("y: "+y);

    for(let i=0;i<12;i++)
    {
      if(j==0)
      {
        //console.log(this.indicatorGroups);
        //console.log("entra");
        //console.log("indicatorGroup registros: "+ this.indicatorGroups[j].indicators[y].registries.length);
        cantidad = this.indicatorGroups[j].indicators[y].registries.length;
      }
    }
    //console.log("cantidad registros: "+ cantidad);
    
    return cantidad;
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
