import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-file-document-subform',
  templateUrl: '../../indicator-detail/file-document-form/file-document-form.component.html',
  styleUrls: ['./file-document-subform.component.css']
})
export class FileDocumentSubformComponent implements OnInit {

  @Output() docAdded: EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor() { }

  ngOnInit() {
  }

  upload(file: File[]){
    this.docAdded.emit(file);
  }
}
