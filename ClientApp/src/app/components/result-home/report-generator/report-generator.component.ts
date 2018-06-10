import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-report-generator',
  templateUrl: './report-generator.component.html',
  styleUrls: ['./report-generator.component.css']
})
export class ReportGeneratorComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  public downloadPDF()
  {
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

  

  constructor() { }

  ngOnInit() {
  }

  public PDFGenerator(){

  }

  public ExcelGenerator(){
    
  }



}
