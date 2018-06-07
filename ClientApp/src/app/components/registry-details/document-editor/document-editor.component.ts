import { Component, OnInit, Input } from '@angular/core';

import { Registry } from '../../../shared/models/registry';
import { Indicator } from '../../../shared/models/indicator';
import { FileService } from '../../../services/file/file.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Document } from '../../../shared/models/document';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.css'],
})
export class DocumentEditorComponent implements OnInit {

  @Input()
  public document: Document;

  @Input()
  public discriminator: string;

  @Input()
  public editModalRef: BsModalRef;

  public bsValue;

  constructor(private service: FileService) { }

  ngOnInit() { }

  editDocument() {
    this.service.editDocument(this.document, this.discriminator).subscribe();
    this.editModalRef.hide();
    // this.document = null;
    this.editModalRef = null;
  }
}
