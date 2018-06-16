import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Ngx-Bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Model
import { IndicatorGroup } from '../../../shared/models/indicatorGroup';

// Service
import { IndicatorGroupService } from '../../../services/indicator-group/indicator-group.service';
import { IndicatorService } from '../../../services/indicator/indicator.service';

//Importa libreria PDF
import * as jsPDF from 'jspdf';
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';
import { Indicator } from '../../../shared/models/indicator';

@Component({
  selector: 'app-pdfgenerator',
  templateUrl: './pdfgenerator.component.html',
  styleUrls: ['./pdfgenerator.component.css']
})
export class PdfgeneratorComponent implements OnInit {

  //modalRef: BsModalRef;
  @Input() modalRef: BsModalRef; 

  @Input() indicatorGroups;

  selectedYear: number;

  public indicators: Indicator[] = [];

  public isClicked:Boolean = false;

  constructor(private modalService: BsModalService, private service: IndicatorGroupService, private serviceIndicator: IndicatorService) 
  { 
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
  }

  ngOnInit() {

    console.log(this.indicatorGroups);

    this.GeneraIndicadores();

    
  }

  GeneraIndicadores()
  {

      for(let i=1; i<this.indicatorGroups.length+1;i++)
      {    
        
        this.service.getIndicatorGroup(i).subscribe(g => {
          g.indicators.forEach(indicator => {
            this.serviceIndicator.getIndicatorYearRegistries(indicator.indicatorID, this.selectedYear).subscribe(j => {
              this.indicators.push(j);
              
            });
          });
  
        });
  
      }
    
    
  } 

  OrdernarArregloIndicators()
  {
    console.log("Entra");
    this.indicators.sort(
      function(a,b)
      {
        return a.indicatorID - b.indicatorID;
      });

    
  }

  downloadPDF()
  {


    /*if(!this.isClicked)
    {
      this.isClicked = true;

      this.GeneraIndicadores(indicatorGroups);

    }*/

    this.OrdernarArregloIndicators();

    console.log(this.indicatorGroups);

    console.log(this.indicators);

    let doc = new jsPDF();

    let y = 25;

    //console.log("largo indicator group: "+this.indicatorGroups.length);

    let n = this.indicatorGroups.length;

    console.log("n: "+n);

    let empiezaJ = 0;

    let empJ=0;

    for(let i=0; i<n; i++)
    {
      doc.setFontSize(15);

      doc.text(10,y,(i+1)+".- "+this.indicatorGroups[i].name);

      console.log("grupo: "+this.indicatorGroups[i].name);
      //console.log("this.indicatorGroups[i].indicators.length: "+this.indicatorGroups[i].indicators.length);
      y=y+5;

      for(let j=0; j<this.indicatorGroups[i].indicators.length; j++)
      {
        //console.log("empiezaJ: "+empiezaJ);
        y=y+5;
        doc.setFontSize(10);
        doc.text(20,y,(j+1)+".- "+this.indicators[empiezaJ].name);
        y=y+5;
        let meta = 0;
        //console.log("Año: "+this.selectedYear);
        for(let y=0; y<this.indicators[empiezaJ].goals.length; y++)
        {
          if(this.indicators[empiezaJ].goals[y].year == this.selectedYear)
          {
            meta += this.indicators[empiezaJ].goals[y].value;
            //console.log("this.indicators[j].goals[y].value: "+this.indicators[j].goals[y].value);
            //console.log("meta: "+meta);
          }
        }
        
        let cantidadRegistro = 0;
        if(this.indicators[empiezaJ].registriesType==1)
        {
          for(let z=0;z < this.indicators[empiezaJ].registries.length; z++)
          {
            cantidadRegistro+=this.indicators[empiezaJ].registries[z].quantity;
          }        
        }
        else if(this.indicators[empiezaJ].registriesType==2)
        {
          for(let z=0;z < this.indicators[empiezaJ].registries.length; z++)
          {
            cantidadRegistro+=this.indicators[empiezaJ].registries[z].percent;
          }        
        }
        else
        {
          cantidadRegistro = this.indicators[empiezaJ].registries.length;
        }

        doc.text(20,y," Meta: "+meta+" Cantidad Registros: "+ cantidadRegistro);          
        
        //console.log("indicators[j].name"+this.indicators[j].name);

        //console.log("j: "+j);

        empiezaJ++;
        
      }

      console.log("i: "+i);

      y=y+10;

      console.log("y: "+y+ " y%285: "+y%285);

      if(y%285==0)
      {
        y=25;
        doc.addPage();
      }
      
    }


    doc.save('test.pdf');


    /*
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

      doc.save('test.pdf');*/

  }

}
