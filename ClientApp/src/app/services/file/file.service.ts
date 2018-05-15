import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Injectable()
export class FileService {

  public static FILES_API = '/api/Files/';

  public constructor(private http: HttpClient) {}

  public downloadFile(link: string) {
    this.http.get(FileService.FILES_API + link, { responseType: 'blob' }).subscribe(blob => {
        saveAs(blob, 'archivo.png')
    })
  }
}
