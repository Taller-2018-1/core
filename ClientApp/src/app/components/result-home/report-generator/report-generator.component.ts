import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-report-generator',
  templateUrl: './report-generator.component.html',
  styleUrls: ['./report-generator.component.css']
})
export class ReportGeneratorComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  //@Input() content : ElementRef;


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
    console.log(this.content);
    console.log(this.content.nativeElement.innerHTML);
  }

  public PDFGenerator(){

  }

  public ExcelGenerator(){
    
  }



}
