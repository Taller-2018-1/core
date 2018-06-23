import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'

//Models
import { Document } from '../../../shared/models/document';

//Services
import { FileService } from '../../../services/file/file.service';

@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit {

  @Input() document: Document;

  constructor(private http: HttpClient,
              private fileService: FileService) {
  }

  ngOnInit() {
  }
}
