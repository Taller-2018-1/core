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

// Importa libreria PDF
import * as jsPDF from 'jspdf';
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';
import { Indicator } from '../../../shared/models/indicator';

// Importa libreria Excel
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'app-reportgenerator',
  templateUrl: './reportgenerator.component.html',
  styleUrls: ['./reportgenerator.component.css']
})
export class ReportgeneratorComponent implements OnInit {

  // modalRef: BsModalRef;
  @Input() modalRef: BsModalRef;

  @Input() indicatorGroups;

  setTitlePeriod: string; // variable utilizada para cambiar el titulo del resultado del periodo seleccionado
  setContentDropdown = 'Ninguno'; // variable utilizada para cambiar el contenido del dropdown resultado del periodo seleccionado
  options: string[] = []; // arreglo que se adecua al periodo que se selecciona

  selectedYear: number;
  selectedYearText: String; // cambia la opcion del dropdown
  years: number[] = []; // List of years from 2018 to CurrentYear
  baseYear: number;

  selectedMonthTex = 'Seleccione Mes'; // Default selection (string shown in the dropdown)
  selectedMonth: number; // The current selected month (number), depends of the name of the month in spanish.
  months: number[] = []; // List of the months from 0 (January) to the current month (defined in ngOnInit)
  monthsOfTheYear: string[] = []; // List with the list names of the months (in spanish) of the selected year (defined in ngOnInit)
  isMonthDisabled = false;
  // tslint:disable-next-line:max-line-length
  Months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  selectMonth = 'Ninguno';

  public indicators: Indicator[] = [];
  public isClicked: Boolean = false;
  public indicator$: Observable<Indicator>;
  private idIndicator: number;

  selectedReport = 'PDF';

  selectedPeriod = 'Ninguno';
  periods: string[] = ['Ninguno', 'Trimestral', 'Mensual']; // List of periods

  selectedTrimester = 'Ninguno';
  trimester: string[] = ['Trimestre 1', 'Trimestre 2', 'Trimestre 3', 'Trimestre 4']; // List of Trimester

  // tslint:disable-next-line:max-line-length
  // ThinkAgro logo in base64.
  // I used the following url to convert image to base 64
  // http://dataurl.net/#dataurlmaker
  img = 'data:image/jpeg;base64,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'
  constructor(private modalService: BsModalService, private service: IndicatorGroupService, private serviceIndicator: IndicatorService) {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    this.selectedYearText = String(currentYear);
  }

  ngOnInit() {

    const currentYear = new Date().getFullYear();
    this.baseYear = 2018;
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
    this.GeneraIndicadores(currentYear);
  }

  // selecciona el reporte PDF,XLS
  selectReport(report: string) {
    this.selectedReport = report;
  }

  // selecciona el año
  selectYear(year: any) {
    this.selectedYearText = year;
    this.selectedYear = year;
  }

  // selecciona periodo Trimestral,Mensual
  selectPeriod(period: string) {
    this.selectedPeriod = period;
    this.selectOption();
  }

  // dropdown que se adapta dependiendo del periodo seleccionado
  selectOption() {
    if (this.selectedPeriod === 'Ninguno') {
      this.setTitlePeriod = ' ';
      this.setContentDropdown = 'Ninguno'; // default is shown
      this.options = [null];
      this.selectMonth = 'Ninguno';
      this.selectedTrimester='Ninguno';
    }
    if (this.selectedPeriod === 'Trimestral') {
      this.setTitlePeriod = 'Seleccione Trimestre';
      this.setContentDropdown = 'Trimestre 1'; // default is shown
      this.selectedTrimester='Trimestre 1';
      this.options = this.trimester;
    }
    if (this.selectedPeriod === 'Mensual') {
      this.setTitlePeriod = 'Seleccione Mes';
      this.setContentDropdown = 'Enero'; // default is shown
      this.selectMonth = 'Enero';
      this.options = this.monthsOfTheYear;
    }
  }

  // cambia al seleccionar el contenido del ultimo dropdown
  setOptionContentDropdown(option: string) {
    this.setContentDropdown = option; // MES
   
    for(let i = 0; i<12; i++)
    {
      if (option.localeCompare(this.Months[i]) === 0)
      {
        this.selectMonth = option;
      }
    }

    for(let i = 0; i<4; i++)
    {
      if (option.localeCompare(this.trimester[i]) === 0)
      {
        this.selectedTrimester = option;
      }
    }  

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

  GeneraIndicadores(year:number) {

    for (let i = 0; i < this.indicatorGroups.length; i++) {
      for (let j = 0; j < this.indicatorGroups[i].indicators.length; j++) {
        this.indicators.push(this.indicatorGroups[i].indicators[j]);
      }
    }
  }


  downloadPDF() {
    const maxY = 260; // limite del Y para que escriba en el pdf antes de saltar a nueva pagina

    const doc = new jsPDF();

    const xImage = 140;
    const yImage = 10;
    const imageWidth = 60;
    const imageHigh = 32;

    doc.addImage(this.img, 'PNG', xImage, yImage, imageWidth, imageHigh);

    let y = 50;

    const n = this.indicatorGroups.length;

    let empiezaJ = 0;

    const empJ = 0;

    doc.setFontSize(20); // TITULO

    let mesString = 'Ninguno';
    let mesInt = 0;

    if (this.selectMonth.localeCompare('Ninguno') !== 0) {
      for (let i = 0; i < this.Months.length; i++) {
          if (this.selectMonth.localeCompare(this.Months[i]) === 0) {
            mesString = this.Months[i];
            mesInt = i + 1;
          }
      }
      doc.text(60, y, 'Reporte Indicadores ' + this.selectedYear + ' ' + this.selectMonth);
    } else {
      doc.text(60, y, 'Reporte Indicadores ' + this.selectedYear);
    }

    y = y + 15;


    // recorre IndicatorsGroups
    for (let i = 0; i < n; i++) {
      doc.setFontSize(15);

      const largoNombreGrupo = this.indicatorGroups[i].name.length;
      if (largoNombreGrupo > 75) {
        if (this.indicatorGroups[i].name[75] === ' ') {

          // caso cuando el nombre del indicatorGroup no cabe en una sola linea y hay un espacio en blanco

          if (y + 20 > maxY) {
            doc.addPage();
            y = 25;
          }

          doc.text(10, y, (i + 1) + '.- ' + this.indicatorGroups[i].name.substr(0, 75));
          y = y + 7;
          doc.text(15, y, this.indicatorGroups[i].name.substr(75, largoNombreGrupo));
        } else {

          // caso cuando el nombre del indicatorGroup no cabe en una sola linea y no hay espacio en blanco

          if (y + 20 > maxY) {
            doc.addPage();
            y = 25;
          }

          let num = 75;
          while (this.indicatorGroups[i].name[num] !== ' ') {
            num--;
          }


          doc.text(10, y, (i + 1) + '.- ' + this.indicatorGroups[i].name.substr(0, num));

          y = y + 7;
          doc.text(15, y, this.indicatorGroups[i].name.substr(num, largoNombreGrupo));
        }

      } else {

        if (y + 20 > maxY) {
          doc.addPage();
          y = 25;
        }

        doc.text(10, y, (i + 1) + '.- ' + this.indicatorGroups[i].name);
      }
      y = y + 5;

      // recorre los indicators por cada indicatorGroup
      for (let j = 0; j < this.indicatorGroups[i].indicators.length; j++) {
        y = y + 5;
        doc.setFontSize(10);

        const largoNombreIndicador = this.indicators[empiezaJ].name.length;
        if (largoNombreIndicador > 100) {
          if (this.indicators[empiezaJ].name[100] === ' ') { // cambio indicatorsGroup por indicators

            if (y + 5 > maxY) {
              doc.addPage();
              y = 25;
            }
            y = y + 5;
            doc.text(20, y, (j + 1) + '.- ' + this.indicators[empiezaJ].name.substr(0, 100));
            y = y + 5;
            doc.text(25, y, this.indicators[empiezaJ].name.substr(100, largoNombreIndicador));
          } else {

            if (y + 5 > maxY) {
              doc.addPage();
              y = 25;
            }

            let num = 100;
            while (this.indicators[empiezaJ].name[num] !== ' ') {
              num--;
            }
            y = y + 5;

            doc.text(20, y, (j + 1) + '.- ' + this.indicators[empiezaJ].name.substr(0, num));
            y = y + 5;
            doc.text(25, y, this.indicators[empiezaJ].name.substr(num, largoNombreIndicador));
          }

        } else {

          if (y + 5 > maxY) {
            doc.addPage();
            y = 25;
          }

          y = y + 5;
          doc.text(20, y, (j + 1) + '.- ' + this.indicators[empiezaJ].name);
        }

        y = y + 5;

        let meta = 0;

        for (let k = 0; k < this.indicators[empiezaJ].goals.length; k++) {
          const mes = this.indicators[empiezaJ].goals[k].month + 1;
          if (this.indicators[empiezaJ].goals[k].year === this.selectedYear) {
            if (mesString.localeCompare('Ninguno') === 0 && this.selectedTrimester.localeCompare('Ninguno')===0 ) {
              meta += this.indicators[empiezaJ].goals[k].value;
            } else {
              if(!(this.selectedTrimester.localeCompare('Ninguno')===0))
              {
                if(this.selectedTrimester.localeCompare('Trimestre 1')===0)
                {
                  // Entro Trimestre 1
                  for(let g=1;g<=3;g++)
                  {
                    if (g === mes) {
                      meta += this.indicators[empiezaJ].goals[k].value;
                    }
                  }
                }
                if(this.selectedTrimester.localeCompare('Trimestre 2')===0)
                {
                  // Entro Trimestre 2
                  for(let g=4;g<=6;g++)
                  {
                    if (g === mes) {
                      meta += this.indicators[empiezaJ].goals[k].value;
                    }
                  } 
                }
                if(this.selectedTrimester.localeCompare('Trimestre 3')===0)
                {
                  // Entro Trimestre 3
                  for(let g=7;g<=9;g++)
                  {
                    if (g === mes) {
                      meta += this.indicators[empiezaJ].goals[k].value;
                    }
                  }
                }
                if(this.selectedTrimester.localeCompare('Trimestre 4')===0)
                {
                  // Entro Trimestre 4
                  for(let g=10;g<=12;g++)
                  {
                    if (g === mes) {
                      meta += this.indicators[empiezaJ].goals[k].value;
                    }
                  }
                }
              }
              else if (mesInt === mes) {
                // Entro Mes
                meta += this.indicators[empiezaJ].goals[k].value;
              }
            }
          }
        }

        let cantidadRegistro = 0;
        if (this.indicators[empiezaJ].registriesType === 1) {

          for (let z = 0; z < this.indicators[empiezaJ].registries.length; z++) {
            const date: Date = new Date(this.indicators[empiezaJ].registries[z].date);
            const anio = date.getFullYear();
            const mes = date.getMonth() + 1;
            if (anio === this.selectedYear) {
              if (mesString.localeCompare('Ninguno') === 0 && this.selectedTrimester.localeCompare('Ninguno')===0 ) {
                cantidadRegistro += this.indicators[empiezaJ].registries[z].quantity;
              } else {
                if(!(this.selectedTrimester.localeCompare('Ninguno')===0))
                {
                  if(this.selectedTrimester.localeCompare('Trimestre 1')===0)
                  {
                    // Entro Trimestre 1
                    for(let g=1;g<=3;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[empiezaJ].registries[z].quantity;
                      }
                    }
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 2')===0)
                  {
                    // Entro Trimestre 2
                    for(let g=4;g<=6;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[empiezaJ].registries[z].quantity;
                      }
                    } 
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 3')===0)
                  {
                    // Entro Trimestre 3
                    for(let g=7;g<=9;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[empiezaJ].registries[z].quantity;
                      }
                    }
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 4')===0)
                  {
                    // Entro Trimestre 4
                    for(let g=10;g<=12;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[empiezaJ].registries[z].quantity;
                      }
                    }
                  }
                }
                else if (mesInt === mes) {
                  // Entro Mes
                  cantidadRegistro += this.indicators[empiezaJ].registries[z].quantity;
                }
              }
            }
          }

          doc.text(20, y, '     Cantidad Registros: ' + cantidadRegistro);
          y = y + 5;
          doc.text(20, y, '     Meta: ' + meta);

        } else if (this.indicators[empiezaJ].registriesType === 2) {
          for (let z = 0; z < this.indicators[empiezaJ].registries.length; z++) {
            const date: Date = new Date(this.indicators[empiezaJ].registries[z].date);
            const anio = date.getFullYear();
            const mes = date.getMonth() + 1;
            if (anio === this.selectedYear) {
              if (mesString.localeCompare('Ninguno') === 0 && this.selectedTrimester.localeCompare('Ninguno')===0 ) {
                cantidadRegistro += this.indicators[empiezaJ].registries[z].percent;
              } else {
                if(!(this.selectedTrimester.localeCompare('Ninguno')===0))
                {
                  if(this.selectedTrimester.localeCompare('Trimestre 1')===0)
                  {
                    // Entro Trimestre 1
                    for(let g=1;g<=3;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[empiezaJ].registries[z].percent;
                      }
                    }
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 2')===0)
                  {
                    // Entro Trimestre 2"
                    for(let g=4;g<=6;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[empiezaJ].registries[z].percent;
                      }
                    } 
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 3')===0)
                  {
                    // Entro Trimestre 3
                    for(let g=7;g<=9;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[empiezaJ].registries[z].percent;
                      }
                    }
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 4')===0)
                  {
                    // Entro Trimestre 4
                    for(let g=10;g<=12;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[empiezaJ].registries[z].percent;
                      }
                    }
                  }
                }
                else if (mesInt === mes) {
                  // Entro Mes
                  cantidadRegistro += this.indicators[empiezaJ].registries[z].percent;
                }
              }
            }
          }

          doc.text(20, y, '     Cantidad Porcentaje: ' + cantidadRegistro +  '%');
          y = y + 5;
          doc.text(20, y, '     Meta: ' + meta);

        } else {
          for (let z = 0; z < this.indicators[empiezaJ].registries.length; z++) {
            const date: Date = new Date(this.indicators[empiezaJ].registries[z].date);
            const anio = date.getFullYear();
            const mes = date.getMonth() + 1;
            if (anio === this.selectedYear) {              
              if (mesString.localeCompare('Ninguno') === 0 && this.selectedTrimester.localeCompare('Ninguno')===0 ) {
                cantidadRegistro++;
              }  else {
                if(!(this.selectedTrimester.localeCompare('Ninguno')===0))
                {
                  if(this.selectedTrimester.localeCompare('Trimestre 1')===0)
                  {
                    // Entro Trimestre 1
                    for(let g=1;g<=3;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro++;
                      }
                    }
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 2')===0)
                  {
                    // Entro Trimestre 2
                    for(let g=4;g<=6;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro++;
                      }
                    } 
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 3')===0)
                  {
                    // Entro Trimestre 3
                    for(let g=7;g<=9;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro++;
                      }
                    }
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 4')===0)
                  {
                    // Entro Trimestre 4
                    for(let g=10;g<=12;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro++;
                      }
                    }
                  }
                }
                else if (mesInt === mes) {
                  // Entro Mes
                  cantidadRegistro++;
                }
              }
            }
          }
          doc.text(20, y, '     Cantidad General: ' + cantidadRegistro);
          y = y + 5;
          doc.text(20, y, '     Meta: ' + meta);
        }


        empiezaJ++;

      }

      y = y + 10;


    }
    if (this.selectedPeriod === 'Ninguno' ) {
      doc.save('ReporteAnual.pdf');
    }

    if  (this.selectedPeriod === 'Trimestral') {
      doc.save('ReporteTrimestral.pdf');
    }

    if  (this.selectedPeriod === 'Mensual') {
      doc.save('ReporteMensual.pdf');
    }

    if  (this.selectedPeriod === 'Semanal') {
      doc.save('ReporteSemanal.pdf');
    }

  }

  hideModal() {
    this.modalRef.hide();
  }

  downloadExcel() {
    const wb = XLSX.utils.book_new();

    wb.Props = {
      Title: 'Reporte Indicadores',
      Subject: 'Informe',
      Author: 'ThinkAgro',
      CreatedDate: new Date(2017, 12, 19)
    };

    wb.SheetNames.push('Hoja 1');

    const cantidadGruposIndicadores = this.indicatorGroups.length;

    let posicionIndicador = 0;

    let meta = 0;

    let mesString = 'Ninguno';
    let mesInt = 0;

    let ws_data;

    if (this.selectMonth.localeCompare('Ninguno') !== 0) {
      // console.log('if this.selectMonth: '+this.selectMonth);
      for (let i = 0; i < this.Months.length; i++) {
          if (this.selectMonth.localeCompare(this.Months[i]) === 0) {
            mesString = this.Months[i];
            mesInt = i + 1;
          }
      }

      ws_data = [[' ', 'Reporte Indicadores ' + this.selectedYear + ' ' + this.selectMonth]];  // a row with 2 columns
    } else {
      ws_data = [[' ', 'Reporte Indicadores ' + this.selectedYear]];
    }


    ws_data.push([' ', ' ']);

    ws_data.push(['Grupo indicadores', 'Indicador', 'Meta', 'Cantidad registro']);

    for (let i = 0; i < cantidadGruposIndicadores; i++) {
      ws_data.push([this.indicatorGroups[i].name]);


      for (let j = 0; j < this.indicatorGroups[i].indicators.length; j++) {
        meta = 0;
        for (let y = 0; y < this.indicators[posicionIndicador].goals.length; y++) {
          const mes = this.indicators[posicionIndicador].goals[y].month + 1;
          if (this.indicators[posicionIndicador].goals[y].year === this.selectedYear) {
            if (mesString.localeCompare('Ninguno') === 0 && this.selectedTrimester.localeCompare('Ninguno')===0 ) {
              meta += this.indicators[posicionIndicador].goals[y].value;
            } else {
              if(!(this.selectedTrimester.localeCompare('Ninguno')===0))
              {
                if(this.selectedTrimester.localeCompare('Trimestre 1')===0)
                {
                  // Entro Trimestre 1
                  for(let g=1;g<=3;g++)
                  {
                    if (g === mes) {
                      meta += this.indicators[posicionIndicador].goals[y].value;
                    }
                  }
                }
                if(this.selectedTrimester.localeCompare('Trimestre 2')===0)
                {
                  // Entro Trimestre 2
                  for(let g=4;g<=6;g++)
                  {
                    if (g === mes) {
                      meta += this.indicators[posicionIndicador].goals[y].value;
                    }
                  } 
                }
                if(this.selectedTrimester.localeCompare('Trimestre 3')===0)
                {
                  // Entro Trimestre 3
                  for(let g=7;g<=9;g++)
                  {
                    if (g === mes) {
                      meta += this.indicators[posicionIndicador].goals[y].value;
                    }
                  }
                }
                if(this.selectedTrimester.localeCompare('Trimestre 4')===0)
                {
                  // Entro Trimestre 4
                  for(let g=10;g<=12;g++)
                  {
                    if (g === mes) {
                      meta += this.indicators[posicionIndicador].goals[y].value;
                    }
                  }
                }
              }
              else if (mesInt === mes) {
                // Entro Mes
                meta += this.indicators[posicionIndicador].goals[y].value;
              }
            }
          }
        }

        const cantidadMeta = meta.toString();

        let cantidadRegistro = 0;
        if (this.indicators[posicionIndicador].registriesType === 1) {
          for (let z = 0; z < this.indicators[posicionIndicador].registries.length; z++) {
            const date: Date = new Date(this.indicators[posicionIndicador].registries[z].date);
            const anio = date.getFullYear();
            const mes = date.getMonth() + 1;
            if (anio === this.selectedYear) {
              if (mesString.localeCompare('Ninguno') === 0 && this.selectedTrimester.localeCompare('Ninguno')===0 ) {
                cantidadRegistro += this.indicators[posicionIndicador].registries[z].quantity;
              } else {
                if(!(this.selectedTrimester.localeCompare('Ninguno')===0))
                {
                  if(this.selectedTrimester.localeCompare('Trimestre 1')===0)
                  {
                    // Entro Trimestre 1
                    for(let g=1;g<=3;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[posicionIndicador].registries[z].quantity;
                      }
                    }
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 2')===0)
                  {
                    // Entro Trimestre 2
                    for(let g=4;g<=6;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[posicionIndicador].registries[z].quantity;
                      }
                    } 
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 3')===0)
                  {
                    // Entro Trimestre 3
                    for(let g=7;g<=9;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[posicionIndicador].registries[z].quantity;
                      }
                    }
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 4')===0)
                  {
                    // Entro Trimestre 4
                    for(let g=10;g<=12;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[posicionIndicador].registries[z].quantity;
                      }
                    }
                  }
                }
                else if (mesInt === mes) {
                  // Entro Mes
                  cantidadRegistro += this.indicators[posicionIndicador].registries[z].quantity;
                }
              }
            }
          }
        } else if (this.indicators[posicionIndicador].registriesType === 2) {
          for (let z = 0; z < this.indicators[posicionIndicador].registries.length; z++) {
            const date: Date = new Date(this.indicators[posicionIndicador].registries[z].date);
            const anio = date.getFullYear();
            const mes = date.getMonth() + 1;
            if (anio === this.selectedYear) {
              if (mesString.localeCompare('Ninguno') === 0 && this.selectedTrimester.localeCompare('Ninguno') ===0 ){
                cantidadRegistro += this.indicators[posicionIndicador].registries[z].percent;
              } 
              else {
                if(!(this.selectedTrimester.localeCompare('Ninguno')===0))
                {
                  if(this.selectedTrimester.localeCompare('Trimestre 1')===0)
                  {
                    // Entro Trimestre 1
                    for(let g=1;g<=3;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[posicionIndicador].registries[z].percent;                      }
                    }
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 2')===0)
                  {
                    // Entro Trimestre 2
                    for(let g=4;g<=6;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[posicionIndicador].registries[z].percent;                      }
                    } 
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 3')===0)
                  {
                    // Entro Trimestre 3
                    for(let g=7;g<=9;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[posicionIndicador].registries[z].percent;                      }
                    }
                  }
                  if(this.selectedTrimester.localeCompare('Trimestre 4')===0)
                  {
                    // Entro Trimestre 4
                    for(let g=10;g<=12;g++)
                    {
                      if (g === mes) {
                        cantidadRegistro += this.indicators[posicionIndicador].registries[z].percent;                      }
                    }
                  }
                }
                else if (mesInt === mes) {
                  // Entro Mes
                  cantidadRegistro += this.indicators[posicionIndicador].registries[z].percent;                }
              }
            }
          }
        } else {
          for (let z = 0; z < this.indicators[posicionIndicador].registries.length; z++) {
            const date: Date = new Date(this.indicators[posicionIndicador].registries[z].date);
            const anio = date.getFullYear();
            const mes = date.getMonth() + 1;
            if (anio === this.selectedYear) {
              if (mesString.localeCompare('Ninguno') === 0 && this.selectedTrimester.localeCompare('Ninguno')===0 ){
                // cantidadRegistro = this.indicators[posicionIndicador].registries.length;
                cantidadRegistro++;
              } else {
                  if(!(this.selectedTrimester.localeCompare('Ninguno')===0))
                  {
                    if(this.selectedTrimester.localeCompare('Trimestre 1')===0)
                    {
                      // Entro Trimestre 1
                      for(let g=1;g<=3;g++)
                      {
                        if (g === mes) {
                          cantidadRegistro++;                        
                        }
                      }
                    }
                    if(this.selectedTrimester.localeCompare('Trimestre 2')===0)
                    {
                      // Entro Trimestre 2
                      for(let g=4;g<=6;g++)
                      {
                        if (g === mes) {
                          cantidadRegistro++;                        
                        }
                      } 
                    }
                    if(this.selectedTrimester.localeCompare('Trimestre 3')===0)
                    {
                      // Entro Trimestre 3
                      for(let g=7;g<=9;g++)
                      {
                        if (g === mes) {
                          cantidadRegistro++;                        
                        }
                      }
                    }
                    if(this.selectedTrimester.localeCompare('Trimestre 4')===0)
                    {
                      // Entro Trimestre 4
                      for(let g=10;g<=12;g++)
                      {
                        if (g === mes) {
                          cantidadRegistro++;                        
                        }
                      }
                    }
                  }
                  else if (mesInt === mes) {
                    // Entro Mes
                    cantidadRegistro++;                  
                  }
              }
            }
          }
        }

        const cantidadRegistros = cantidadRegistro.toString();

        ws_data.push([' ', this.indicators[posicionIndicador].name, cantidadMeta, cantidadRegistros]);
        posicionIndicador++;
      }
    }



    const ws = XLSX.utils.aoa_to_sheet(ws_data);


    wb.Sheets['Hoja 1'] = ws;


    // Export

    const wbout = XLSX.write(wb, {bookType: 'xlsx',  type: 'binary'});



    // funcion que guarda y crea el archivo
  saveAs(new Blob([this.s2ab(wbout)], {type: 'application/octet-stream'}), 'Informe General.xlsx');

  }

  s2ab(s : any) {
    const buf = new ArrayBuffer(s.length); // convert s to arrayBuffer
    const view = new Uint8Array(buf);  // create uint8array as viewer
    for (let i = 0; i < s.length; i++) {
      // tslint:disable-next-line:no-bitwise
      view[i] = s.charCodeAt(i) & 0xFF; // convert to octet
    }

    return buf;
  }

  downloadReport() {
    if (this.selectedReport === 'PDF') {
      this.downloadPDF();
    }
    if (this.selectedReport === 'XLSX') {
      this.downloadExcel();
    }
  }


}
