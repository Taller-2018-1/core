import { Component, Inject, OnInit, HostBinding,TemplateRef, ElementRef, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

// Model
import { IndicatorGroup } from '../../shared/models/indicatorGroup';
import { Indicator } from '../../shared/models/indicator';

// Service
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';
import { IndicatorService } from '../../services/indicator/indicator.service';


// Ngx-Bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//Importa libreria PDF
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

  public idIndicator:number = -1;

  public indicator:Indicator;

  modalRef: BsModalRef;
  @ViewChild('content') content: ElementRef;
  
  //@Input() indicatorGroup: IndicatorGroup;

  selectedYear: number;

  goals$: Observable<number[]>;

  public indicator$: Observable<Indicator>;


  public indicators: Indicator[] = [];

  public cantidadIndicador = 0;

  public isClicked: Boolean = false;

  constructor(private service: IndicatorGroupService, private serviceIndicator: IndicatorService , 
    private modalService: BsModalService, private route: ActivatedRoute) {

      const currentYear = new Date().getFullYear();
      this.selectedYear = currentYear;

    //this.idIndicator = this.route.snapshot.params.idIndicator;

    this.cantidadIndicador = this.serviceIndicator.getIndicator.length;


   
    

    
  }

  
  

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    this.indicatorGroups$ = this.service.getIndicatorGroups();

    this.idIndicator = 1;

    this.indicator$ = this.serviceIndicator.getIndicatorYearRegistries(this.idIndicator, this.selectedYear);
    

    

    


    

    //console.log(this.indicators.length);
    
   
    /*this.indicators.forEach(indicator => {
      console.log(indicator);
      }); */

    //this.indicatorID=this.indicatorGroup.indicatorGroupID;
    //console.log("indicatorGroup"+this.indicatorGroups$);

    

    //this.goals$ = this.service.getGoalsYear(this.indicatorGroup.indicatorGroupID, this.selectedYear);

    /*this.indicator = this.serviceIndicator.getIndicator(0);

    for(let i=0; i<this.cantidadIndicador;i++)
    {
      this.indicators.push();    
    } */

   
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  GenerarIndicadores(cant:number, num:number)
  {
    /*let cont = 0;
    this.indicators.sort(function(a,b)
    {
      //console.log("b.indicatorID: "+b.indicatorID);
      //console.log("a.indicatorID: "+a.indicatorID);
      cont++;
      return a.indicatorID - b.indicatorID; 
    }); */


    //console.log(this.indicators);

    console.log("num: "+num);
    if(num==0)
    {
      console.log("cantidad grupos: "+cant);
      //for(let i=1; i<2;i++)
      //{    
      
        /*this.service.getIndicatorGroup(1).subscribe(g => {
          g.indicators.forEach(indicator => {
            this.serviceIndicator.getIndicatorYearRegistries(indicator.indicatorID, this.selectedYear).subscribe(j => {
              this.indicators.push(j);
              
            });
          });
        });
      //}*/
  
      //console.log(this.indicators);
  
      console.log("cantidad indicadores: "+this.indicators.length);
      for(let i=0;i<this.indicators.length;i++)
      {
        console.log("indicador n° "+ i +" cantidad registro: "+ this.indicators[i].registries.length);
      }
    }
    
  }

  IndicadorID(id:number)
  {
    
    //console.log("ID: "+id);
    this.idIndicator=id;
    
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

  cantidadIndicatorGroup(indicatorGroups : IndicatorGroup[], indicator: Indicator,j: number){
    this.indicatorGroups = indicatorGroups;
    let cantidad= 0;

    this.indicator= indicator;

    console.log("J: "+j);

    //console.log(this.indicator);

    //for(let i=0;i<12;i++)
    //{
      //if(j==0)
      //{
        //console.log(this.indicatorGroups);
        //console.log("entra");
        //console.log("indicatorGroup registros: "+ this.indicatorGroups[j].indicators[y].registries.length);
        cantidad = this.indicators[j].registries.length;
      //}
    //}
    //console.log("cantidad registros: "+ cantidad);
    
    return cantidad;
  }

  Indicator(indicator: Indicator)
  {
    //console.log(indicator);
  }

  GeneraIndicadores(indicatorGroups : IndicatorGroup[])
  {

      for(let i=1; i<indicatorGroups.length+1;i++)
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


  downloadPDF(indicatorGroups : IndicatorGroup[])
  {



    /*this.indicatorGroups = indicatorGroups;

    if(!this.isClicked)
    {
      this.isClicked = true;

      this.GeneraIndicadores(indicatorGroups);

    }

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
