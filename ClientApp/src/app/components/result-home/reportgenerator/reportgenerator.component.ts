import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Ngx-Bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Model
import { IndicatorGroup } from '../../../shared/models/indicatorGroup';
import { Months } from '../../../shared/models/months';

// Service
import { IndicatorGroupService } from '../../../services/indicator-group/indicator-group.service';
import { IndicatorService } from '../../../services/indicator/indicator.service';

//Importa libreria PDF
import * as jsPDF from 'jspdf';
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';
import { Indicator } from '../../../shared/models/indicator';

//Importa libreria Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-reportgenerator',
  templateUrl: './reportgenerator.component.html',
  styleUrls: ['./reportgenerator.component.css']
})
export class ReportgeneratorComponent implements OnInit {

  //modalRef: BsModalRef;
  @Input() modalRef: BsModalRef;

  @Input() indicatorGroups;

  setTitlePeriod: string;//variable utilizada para cambiar el titulo del resultado del periodo seleccionado
  setContentDropdown: string = "Ninguno";//variable utilizada para cambiar el contenido del dropdown resultado del periodo seleccionado
  options: string[] = [];//arreglo que se adecua al periodo que se selecciona

  selectedYear: number;
  selectedYearText: String;//cambia la opcion del dropdown
  years: number[] = []; // List of years from 2018 to CurrentYear
  baseYear: number;

  selectedMonthText: string = "Seleccione Mes"; // Default selection (string shown in the dropdown)
  selectedMonth: number; // The current selected month (number), depends of the name of the month in spanish.
  months: number[] = []; // List of the months from 0 (January) to the current month (defined in ngOnInit)
  monthsOfTheYear: string[] = []; // List with the list names of the months (in spanish) of the selected year (defined in ngOnInit)
  isMonthDisabled = false;
  Months: string[]=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  selectMonth: string = "Ninguno";

  public indicators: Indicator[] = [];
  public isClicked: Boolean = false;
  public indicator$: Observable<Indicator>;
  private idIndicator: number;

  selectedReport: string = "PDF";

  selectedPeriod: string = "Ninguno";
  periods: string[] = ["Ninguno", "Trimestral", "Mensual", "Semanal"]; // List of periods

  selectedTrimester: string = "Trimestre 1";
  trimester: string[] = ["Trimestre 1", "Trimestre 2", "Trimestre 3", "Trimestre 4"]; // List of Trimester

  selectedWeek: string = "Semana 1";
  weeks: string[] = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"]; // List of Trimester

  // tslint:disable-next-line:max-line-length
  img : string = 'data:image/png;base64,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';

  constructor(private modalService: BsModalService, private service: IndicatorGroupService, private serviceIndicator: IndicatorService) {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    this.selectedYearText = String(currentYear);
  }

  ngOnInit() {
    console.log(this.indicatorGroups);

    //const currentYear = new Date().getFullYear();
    //this.baseYear = 2018;
    const currentYear = 2018;
    this.baseYear = 2016;
    for (let i = 0; i <= (currentYear - this.baseYear); i++) {
      this.years[i] = this.baseYear + i;
    }

    const currentMonth = new Date().getMonth(); // 0 = Juanuary, 1 = February, ..., 11 = December
    // List of the months (numbers) from 0 to the current month (max 11)
    for (let i = 0; i <= currentMonth; i++) {
      this.months[i] = i;
    }
    this.setMonthsOfTheYear(); // List of the names of the months, based in the prior list (this.months)
    this.selectedMonth = -1;
    //this.GeneraIndicadores(Number(this.selectedYearText));
    this.GeneraIndicadores(currentYear); 
  }

  //selecciona el reporte PDF,XLS
  selectReport(report: string) {
    this.selectedReport = report;
  }

  //selecciona el año
  selectYear(year: any) {
    this.selectedYearText = year; 
    this.selectedYear = year;
    //this.GeneraIndicadores(Number(this.selectedYearText));
  }

  //selecciona periodo Trimestral,Mensual,Semanal
  selectPeriod(period: string) {
    this.selectedPeriod = period;
    //console.log("this.selectedPeriod: "+this.selectedPeriod);
    this.selectOption();
  }

  //dropdown que se adapta dependiendo del periodo seleccionado 
  selectOption() {
    if (this.selectedPeriod == 'Ninguno') {
      this.setTitlePeriod = " ";
      this.setContentDropdown = "Ninguno"; //default is shown
      this.options = [null];
      this.selectMonth = "Ninguno";
    }
    if (this.selectedPeriod == 'Trimestral') {
      this.setTitlePeriod = "Seleccione Trimestre";
      this.setContentDropdown = "Trimestre 1"; //default is shown
      this.options = this.trimester;
    }
    if (this.selectedPeriod == 'Mensual') {
      this.setTitlePeriod = "Seleccione Mes";
      this.setContentDropdown = "Enero"; //default is shown
      this.selectMonth = "Enero";
      this.options = this.monthsOfTheYear;
    }
    if (this.selectedPeriod == 'Semanal') {
      this.setTitlePeriod = "Seleccione Semana";
      this.setContentDropdown = "Semana 1"; //default is shown
      this.options = this.weeks;
    }

  }

  // cambia al seleccionar el contenido del ultimo dropdown
  setOptionContentDropdown(option: string) {
    this.setContentDropdown = option;//MES
    this.selectMonth = option;
  }

  setMonths() {
    const currentYear = new Date().getFullYear();
    if (this.selectedYear < currentYear) {
      this.months = [];
      for (let i = 0; i <= 11; i++) { // Months from January (0) to December (11)
        this.months[i] = i;
      }
    }
    // tslint:disable-next-line:one-line
    else {
      this.months = [];
      const currentMonth = new Date().getMonth(); // 0 = Juanuary, 1 = February, ..., 11 = Decembery
      for (let i = 0; i <= currentMonth; i++) {
        this.months[i] = i;
      }
    }
    this.setMonthsOfTheYear();
  }

  // Sets the names of the months of the selected year
  setMonthsOfTheYear() {
    this.monthsOfTheYear = [];
    this.months.forEach(month => {
      this.monthsOfTheYear[month] = Months[month];
    });
  }
  // According to the name of a month, it sets the corresponding number to the 'selectedMonth'
  setSelectedMonth(month: string) {
    this.selectedMonth = Months[month];
  }

  GeneraIndicadores(year: number) {

    for (let i = 0; i < this.indicatorGroups.length; i++) { 
      
      for(let j = 0; j<this.indicatorGroups[i].indicators.length; j++) 
      {  
        this.indicators.push(this.indicatorGroups[i].indicators[j]);
        
      }
    }
  }

  OrdernarArregloIndicators() {
   
    this.indicators.sort(
      function (a, b) {
        return a.indicatorID - b.indicatorID;
      });
  }

  downloadPDF() {
    
    let maxY = 260; // limite del Y para que escriba en el pdf antes de saltar a nueva pagina

    let doc = new jsPDF();

    let xImage = 60;
    let yImage = 10;

    doc.addImage(this.img, 'PNG', xImage, yImage, 100, 25);

    let y = 50;

    let n = this.indicatorGroups.length;

    let empiezaJ = 0;

    let empJ = 0;

    doc.setFontSize(25);

    let mesString= "Ninguno";
    let mesInt = 0;
    
    if(this.selectMonth.localeCompare("Ninguno")!=0)
    {
      for(let i = 0; i<this.Months.length; i++)
      {
          if(this.selectMonth.localeCompare(this.Months[i])==0)
          {
            mesString=this.Months[i];
            mesInt=i+1;
          }
      }
      doc.text(60, y, "Informe General " + this.selectedYear + " " + this.selectMonth);
    }
    else
    {
      doc.text(60, y, "Informe General " + this.selectedYear);
    }

    y = y + 15;


    // recorre IndicatorsGroups
    for (let i = 0; i < n; i++) {
      doc.setFontSize(15);

      let largoNombreGrupo = this.indicatorGroups[i].name.length;
      if (largoNombreGrupo > 75) {
        if (this.indicatorGroups[i].name[75] == ' ') {

          // caso cuando el nombre del indicatorGroup no cabe en una sola linea y hay un espacio en blanco

          if (y + 20 > maxY) {
            doc.addPage();
            y = 25;
          }

          doc.text(10, y, (i + 1) + ".- " + this.indicatorGroups[i].name.substr(0, 75));
          y = y + 7;
          doc.text(15, y, this.indicatorGroups[i].name.substr(75, largoNombreGrupo));
        }
        else {

          // caso cuando el nombre del indicatorGroup no cabe en una sola linea y no hay espacio en blanco

          if (y + 20 > maxY){
            doc.addPage();
            y = 25;
          }

          let num = 75;
          while (this.indicatorGroups[i].name[num] != ' ') {
            num--;
          }


          doc.text(10, y, (i + 1) + ".- " + this.indicatorGroups[i].name.substr(0, num));

          y = y + 7;
          doc.text(15, y, this.indicatorGroups[i].name.substr(num, largoNombreGrupo));
        }

      }
      else {

        if (y + 20> maxY){
          doc.addPage();
          y = 25;
        }

        doc.text(10, y, (i + 1) + ".- " + this.indicatorGroups[i].name);
      }
      y = y + 5;

      // recorre los indicators por cada indicatorGroup
      for (let j = 0; j < this.indicatorGroups[i].indicators.length; j++) {
        y = y + 5;
        doc.setFontSize(10);

        let largoNombreIndicador = this.indicators[empiezaJ].name.length;
        if (largoNombreIndicador > 100) {
          if (this.indicators[empiezaJ].name[100] == ' ') { // cambio indicatorsGroup por indicators

            if (y + 5 > maxY){
              doc.addPage();
              y = 25;
            }

            doc.text(20, y, (j + 1) + ".- " + this.indicators[empiezaJ].name.substr(0, 100));
            y = y + 5;
            doc.text(25, y, this.indicators[empiezaJ].name.substr(100, largoNombreIndicador));
          }
          else {

            if (y + 5 > maxY){
              doc.addPage();
              y = 25;
            }

            let num = 100;
            while (this.indicators[empiezaJ].name[num] != ' ') {
              num--;
            }
            doc.text(20, y, (j + 1) + ".- " + this.indicators[empiezaJ].name.substr(0, num));
            y = y + 5;
            doc.text(25, y, this.indicators[empiezaJ].name.substr(num, largoNombreIndicador));
          }

        }
        else {

          if (y + 5> maxY){
            doc.addPage();
            y = 25;
          }

          doc.text(20, y, (j + 1) + ".- " + this.indicators[empiezaJ].name);
        }

        y = y + 5;

        let meta = 0;

        for (let y = 0; y < this.indicators[empiezaJ].goals.length; y++) {
          if (this.indicators[empiezaJ].goals[y].year == this.selectedYear) {
            if(mesString.localeCompare("Ninguno")==0)
            {
              meta += this.indicators[empiezaJ].goals[y].value;
            }
            else
            {
              if(mesInt == this.indicators[empiezaJ].goals[y].month+1)
              {
                meta += this.indicators[empiezaJ].goals[y].value;
              }
            }
           
          }
        }

        let cantidadRegistro = 0;
        if (this.indicators[empiezaJ].registriesType == 1) {
          
          for (let z = 0; z < this.indicators[empiezaJ].registries.length; z++) {
            const date: Date = new Date(this.indicators[empiezaJ].registries[z].date); 
            const anio = date.getFullYear();  
            const mes = date.getMonth()+1;            
            if(anio==this.selectedYear)
            {
              if(mesString.localeCompare("Ninguno")==0)
              {
                cantidadRegistro += this.indicators[empiezaJ].registries[z].quantity;
              }
              else
              {
                if(mesInt == mes)
                {
                  cantidadRegistro += this.indicators[empiezaJ].registries[z].quantity;
                }
              }              
            }              
          }
          doc.text(20, y, " Meta: " + meta + " Cantidad Registros: " + cantidadRegistro); 
        }
        else if (this.indicators[empiezaJ].registriesType == 2) {
          for (let z = 0; z < this.indicators[empiezaJ].registries.length; z++) {
            const date: Date = new Date(this.indicators[empiezaJ].registries[z].date); 
            const anio = date.getFullYear(); 
            const mes = date.getMonth()+1;            
            if(anio==this.selectedYear)
            {
              if(mesString.localeCompare("Ninguno")==0)
              {
                cantidadRegistro += this.indicators[empiezaJ].registries[z].percent;
              }
              else
              {
                if(mesInt == mes)
                {
                  cantidadRegistro += this.indicators[empiezaJ].registries[z].percent;
                }
              }
              
              //prueba
            }
          }
          doc.text(20, y, " Meta: " + meta + " Cantidad Porcentaje: " + cantidadRegistro + "%"); 
        }
        else {
          for (let z = 0; z < this.indicators[empiezaJ].registries.length; z++) {
            const date: Date = new Date(this.indicators[empiezaJ].registries[z].date); 
            const anio = date.getFullYear(); 
            const mes = date.getMonth()+1;            
            if(anio==this.selectedYear)
            {
              //cantidadRegistro = this.indicators[empiezaJ].registries.length;
              if(mesString.localeCompare("Ninguno")==0)
              {
                cantidadRegistro++;
              }
              else
              {
                if(mesInt == mes)
                {
                  cantidadRegistro++;
                }
              } 
              
            }
          }
          doc.text(20, y, " Meta: " + meta + " Cantidad General: " + cantidadRegistro);
        }

        //doc.text(20, y, " Meta: " + meta + " Cantidad Registros: " + cantidadRegistro);

        empiezaJ++;

      }

      y = y + 10;

      /* 
      if ((y % 270 >= 0) && (y % 270) <= 50) {
        console.log("cambio de pagina, y = "+y);
        y = 25;
        doc.addPage();
      }
      */

    }

    doc.save('Informe.pdf');

  }

  hideModal() {
    this.modalRef.hide();
  }

  

  downloadExcel()
  {

    //console.log("aers");

    this.OrdernarArregloIndicators();


    var wb = XLSX.utils.book_new();

    wb.Props = {
      Title: "Informe General",
      Subject: "Informe",
      Author: "ThinkAgro",
      CreatedDate: new Date(2017,12,19)
    };

    wb.SheetNames.push("Hoja 1");

    let cantidadGruposIndicadores = this.indicatorGroups.length;

    let posicionIndicador = 0;

    let meta = 0;

    let mesString= "Ninguno";
    let mesInt = 0;
    
    if(this.selectMonth.localeCompare("Ninguno")!=0)
    {
      //console.log("if this.selectMonth: "+this.selectMonth);
      for(let i = 0; i<this.Months.length; i++)
      {
          if(this.selectMonth.localeCompare(this.Months[i])==0)
          {
            mesString=this.Months[i];
            mesInt=i+1;
          }
      }

      var ws_data = [[' ','Informe General '+this.selectedYear+ " " + this.selectMonth]];  //a row with 2 columns
    }
    else
    {
      var ws_data = [[' ','Informe General '+this.selectedYear]]; 
    }

    

    ws_data.push([' ',' ']);

    ws_data.push(['Grupo indicadores','Indicador','Meta','Cantidad registro']);

    for(let i=0; i<cantidadGruposIndicadores; i++)
    {
      ws_data.push([this.indicatorGroups[i].name]);

      

      for(let j=0; j<this.indicatorGroups[i].indicators.length; j++)
      {
        meta = 0;
        for(let y=0; y<this.indicators[posicionIndicador].goals.length; y++)
        {
          if(this.indicators[posicionIndicador].goals[y].year == this.selectedYear)
          {
            if(mesString.localeCompare("Ninguno")==0)
            {
              meta += this.indicators[posicionIndicador].goals[y].value;
            }
            else
            {
              if(mesInt == this.indicators[posicionIndicador].goals[y].month+1)
              {
                meta += this.indicators[posicionIndicador].goals[y].value;
              }
            }
            
          }
        }

        let cantidadMeta = meta.toString();

        let cantidadRegistro = 0;
        if(this.indicators[posicionIndicador].registriesType==1)
        {
          for(let z=0;z < this.indicators[posicionIndicador].registries.length; z++)
          {
            const date: Date = new Date(this.indicators[posicionIndicador].registries[z].date); 
            const anio = date.getFullYear(); 
            //console.log("anio"+anio); 
            const mes = date.getMonth()+1;            
            //console.log("mes: "+ mes);
            if(anio==this.selectedYear)
            {
              if(mesString.localeCompare("Ninguno")==0)
              {
                cantidadRegistro+=this.indicators[posicionIndicador].registries[z].quantity;
              }
              else
              {
                if(mesInt == mes)
                {
                  cantidadRegistro+=this.indicators[posicionIndicador].registries[z].quantity;
                }
              }              
            }   
            
          }        
        }
        else if(this.indicators[posicionIndicador].registriesType==2)
        {
          for(let z=0;z < this.indicators[posicionIndicador].registries.length; z++)
          {
            const date: Date = new Date(this.indicators[posicionIndicador].registries[z].date); 
            const anio = date.getFullYear(); 
            //console.log("anio"+anio); 
            const mes = date.getMonth()+1;            
            //console.log("mes: "+ mes);
            if(anio==this.selectedYear)
            {
              if(mesString.localeCompare("Ninguno")==0)
              {
                cantidadRegistro+=this.indicators[posicionIndicador].registries[z].percent;
              }
              else
              {
                if(mesInt == mes)
                {
                  cantidadRegistro+=this.indicators[posicionIndicador].registries[z].percent;
                }
              }              
            } 
            
          }        
        }
        else
        {
          for(let z=0;z < this.indicators[posicionIndicador].registries.length; z++)
          {
            const date: Date = new Date(this.indicators[posicionIndicador].registries[z].date); 
            const anio = date.getFullYear(); 
            //console.log("anio"+anio); 
            const mes = date.getMonth()+1;            
            //console.log("mes: "+ mes);
            if(anio==this.selectedYear)
            {
              if(mesString.localeCompare("Ninguno")==0)
              {
                //cantidadRegistro = this.indicators[posicionIndicador].registries.length;
                cantidadRegistro++;
              }
              else
              {
                if(mesInt == mes)
                {
                  //cantidadRegistro = this.indicators[posicionIndicador].registries.length;
                  cantidadRegistro++;
                }
              }              
            } 
            
          }
          
        }

        let cantidadRegistros = cantidadRegistro.toString();

        ws_data.push([' ',this.indicators[posicionIndicador].name,cantidadMeta, cantidadRegistros]);
        posicionIndicador++;
      }
    }



    var ws = XLSX.utils.aoa_to_sheet(ws_data);


    wb.Sheets["Hoja 1"] = ws;


    //Export

    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    function s2ab(s) { 
      var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
      var view = new Uint8Array(buf);  //create uint8array as viewer
      for (var i=0; i<s.length; i++) 
        view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
      return buf;    
    }

    // funcion que guarda y crea el archivo 
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Informe General.xlsx');

    
  }

  downloadReport(){
    if(this.selectedReport=='PDF'){
      this.downloadPDF();
    }
    if(this.selectedReport=='XLSX'){
      this.downloadExcel();
    }
  }


}
