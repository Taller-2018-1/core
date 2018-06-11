import { Component, OnInit, Input } from '@angular/core';

import { Registry } from '../../../shared/models/registry';
import { Indicator } from '../../../shared/models/indicator';
import { FileService } from '../../../services/file/file.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Document } from '../../../shared/models/document';
import { equal, deepEqual, notDeepEqual } from 'assert';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css'],
})
export class DocumentEditorComponent implements OnInit {

  @Input()
  public document: Document;
  public newDocument: Document;

  @Input()
  public documents: Document[];

  @Input()
  public editModalRef: BsModalRef;

  public bsValue;

  constructor(private service: FileService) { }

  ngOnInit() {
    this.newDocument= JSON.parse(JSON.stringify(this.document)); // To create a clone of the selected document (this.document)
  }

  editDocument() {
    try {
      notDeepEqual(this.document, this.newDocument); // If document and newDcoument are not equal, just close the modal 
      this.service.editDocument(this.newDocument).subscribe();
      // replacing the old registry (this.document) with the edited document (this.newDocument) 
      let index = this.documents.indexOf(this.document);
      this.documents[index] = this.newDocument;

    }
    catch (error) {

    }

    this.editModalRef.hide();
    // this.document = null;
    this.editModalRef = null;
  }
}
