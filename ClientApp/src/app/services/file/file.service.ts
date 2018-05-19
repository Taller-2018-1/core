import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

//Models
import { Document } from '../../shared/models/document';

@Injectable()
export class FileService {

  public static FILES_API = '/api/Files/';

  public constructor(private http: HttpClient) {}

  public downloadFile(document: Document) {
    this.http.get(FileService.FILES_API + document.link, { responseType: 'blob' }).subscribe(blob => {
        saveAs(blob, document.name)
    })
  }
}
