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
  selectedYearText: string;//cambia la opcion del dropdown
  years: number[] = []; // List of years from 2018 to CurrentYear

  selectedMonthText: string = "Seleccione Mes"; // Default selection (string shown in the dropdown)
  selectedMonth: number; // The current selected month (number), depends of the name of the month in spanish.
  months: number[] = []; // List of the months from 0 (January) to the current month (defined in ngOnInit)
  monthsOfTheYear: string[] = []; // List with the list names of the months (in spanish) of the selected year (defined in ngOnInit)
  isMonthDisabled = false;

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

  constructor(private modalService: BsModalService, private service: IndicatorGroupService, private serviceIndicator: IndicatorService) {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    this.selectedYearText = String(currentYear);
  }

  ngOnInit() {
    console.log(this.indicatorGroups);

    const currentYear = new Date().getFullYear();
    const baseYear = 2018;
    for (let i = 0; i <= (currentYear - baseYear); i++) {
      this.years[i] = baseYear + i;
    }

    const currentMonth = new Date().getMonth(); // 0 = Juanuary, 1 = February, ..., 11 = December
    // List of the months (numbers) from 0 to the current month (max 11)
    for (let i = 0; i <= currentMonth; i++) {
      this.months[i] = i;
    }
    this.setMonthsOfTheYear(); // List of the names of the months, based in the prior list (this.months)
    this.selectedMonth = -1;
    this.GeneraIndicadores(Number(this.selectedYearText));
  }

  //selecciona el reporte PDF,XLS
  selectReport(report: string) {
    this.selectedReport = report;
  }

  //selecciona el año
  selectYear(year: any) {
    this.selectedYearText = year; 
    this.selectedYear = year;
    this.GeneraIndicadores(Number(this.selectedYearText));
  }

  //selecciona periodo Trimestral,Mensual,Semanal
  selectPeriod(period: string) {
    this.selectedPeriod = period;
    this.selectOption();
  }

  //dropdown que se adapta dependiendo del periodo seleccionado 
  selectOption() {
    if (this.selectedPeriod == 'Ninguno') {
      this.setTitlePeriod = " ";
      this.setContentDropdown = "Ninguno"; //default is shown
      this.options = [null];
    }
    if (this.selectedPeriod == 'Trimestral') {
      this.setTitlePeriod = "Seleccione Trimestre";
      this.setContentDropdown = "Trimestre 1"; //default is shown
      this.options = this.trimester;
    }
    if (this.selectedPeriod == 'Mensual') {
      this.setTitlePeriod = "Seleccione Mes";
      this.setContentDropdown = "Enero"; //default is shown
      this.options = this.monthsOfTheYear;
    }
    if (this.selectedPeriod == 'Semanal') {
      this.setTitlePeriod = "Seleccione Semana";
      this.setContentDropdown = "Semana 1"; //default is shown
      this.options = this.weeks;
    }

  }

  //cambia al seleccionar el contenido del ultimo dropdown
  setOptionContentDropdown(option: string) {
    this.setContentDropdown = option;
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
      console.log(this.months);
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

    for (let i = 1; i < this.indicatorGroups.length + 1; i++) {

      this.service.getIndicatorGroup(i).subscribe(g => {
        g.indicators.forEach(indicator => {
          this.serviceIndicator.getIndicatorYearRegistries(indicator.indicatorID, this.selectedYear).subscribe(j => {
            this.indicators.push(j);

          });
        });

      });

    }

  }

  OrdernarArregloIndicators() {
    console.log("Entra");
    this.indicators.sort(
      function (a, b) {
        return a.indicatorID - b.indicatorID;
      });


  }

  downloadPDF() {

    this.OrdernarArregloIndicators();

    console.log(this.indicatorGroups);

    console.log(this.indicators);

    let doc = new jsPDF();

    let y = 25;

    let n = this.indicatorGroups.length;

    let empiezaJ = 0;

    let empJ = 0;

    doc.setFontSize(25);

    doc.text(60, y, "Informe General " + this.selectedYear);

    y = y + 15;

    for (let i = 0; i < n; i++) {
      doc.setFontSize(15);

      let largoNombreGrupo = this.indicatorGroups[i].name.length;
      if (largoNombreGrupo > 75) {
        if (this.indicatorGroups[i].name[75] == ' ') {
          doc.text(10, y, (i + 1) + ".- " + this.indicatorGroups[i].name.substr(0, 75));
          y = y + 7;
          doc.text(15, y, this.indicatorGroups[i].name.substr(75, largoNombreGrupo));
        }
        else {
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
        doc.text(10, y, (i + 1) + ".- " + this.indicatorGroups[i].name);
      }

      y = y + 5;

      for (let j = 0; j < this.indicatorGroups[i].indicators.length; j++) {
        y = y + 5;
        doc.setFontSize(10);

        let largoNombreIndicador = this.indicators[empiezaJ].name.length;
        if (largoNombreIndicador > 100) {
          if (this.indicatorGroups[i].name[100] == ' ') {
            doc.text(20, y, (j + 1) + ".- " + this.indicators[empiezaJ].name.substr(0, 100));
            y = y + 5;
            doc.text(25, y, this.indicators[empiezaJ].name.substr(100, largoNombreIndicador));
          }
          else {
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
          doc.text(20, y, (j + 1) + ".- " + this.indicators[empiezaJ].name);
        }

        y = y + 5;

        let meta = 0;

        for (let y = 0; y < this.indicators[empiezaJ].goals.length; y++) {
          if (this.indicators[empiezaJ].goals[y].year == this.selectedYear) {
            meta += this.indicators[empiezaJ].goals[y].value;
          }
        }

        let cantidadRegistro = 0;
        if (this.indicators[empiezaJ].registriesType == 1) {
          for (let z = 0; z < this.indicators[empiezaJ].registries.length; z++) {
            cantidadRegistro += this.indicators[empiezaJ].registries[z].quantity;
          }
        }
        else if (this.indicators[empiezaJ].registriesType == 2) {
          for (let z = 0; z < this.indicators[empiezaJ].registries.length; z++) {
            cantidadRegistro += this.indicators[empiezaJ].registries[z].percent;
          }
        }
        else {
          cantidadRegistro = this.indicators[empiezaJ].registries.length;
        }

        doc.text(20, y, " Meta: " + meta + " Cantidad Registros: " + cantidadRegistro);

        empiezaJ++;

      }

      //console.log("i: "+i);

      y = y + 10;

      //console.log("y: "+y+ " y%270: "+y%270);



      if ((y % 270 >= 0) && (y % 270) <= 50) {
        y = 25;
        doc.addPage();
      }

    }

    doc.save('Informe.pdf');

  }

  hideModal() {
    this.modalRef.hide();
  }

  

  downloadExcel()
  {

    console.log("aers");

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

    var ws_data = [[' ','Informe General '+this.selectedYear]];  //a row with 2 columns

    ws_data.push([' ',' ']);

    ws_data.push(['Grupo indicadores','Indicador','Meta','Cantidad registro']);

    for(let i=0; i<cantidadGruposIndicadores; i++)
    {
      ws_data.push([this.indicatorGroups[i].name]);

      //this.indicators[empiezaJ].name

      for(let j=0; j<this.indicatorGroups[i].indicators.length; j++)
      {
        meta = 0;
        for(let y=0; y<this.indicators[posicionIndicador].goals.length; y++)
        {
          if(this.indicators[posicionIndicador].goals[y].year == this.selectedYear)
          {
            meta += this.indicators[posicionIndicador].goals[y].value;
          }
        }

        let cantidadMeta = meta.toString();

        let cantidadRegistro = 0;
        if(this.indicators[posicionIndicador].registriesType==1)
        {
          for(let z=0;z < this.indicators[posicionIndicador].registries.length; z++)
          {
            cantidadRegistro+=this.indicators[posicionIndicador].registries[z].quantity;
          }        
        }
        else if(this.indicators[posicionIndicador].registriesType==2)
        {
          for(let z=0;z < this.indicators[posicionIndicador].registries.length; z++)
          {
            cantidadRegistro+=this.indicators[posicionIndicador].registries[z].percent;
          }        
        }
        else
        {
          cantidadRegistro = this.indicators[posicionIndicador].registries.length;
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
    if(this.selectedReport=='XLS'){
      this.downloadExcel();
    }
  }

}
