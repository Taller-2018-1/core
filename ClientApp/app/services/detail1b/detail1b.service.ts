
import { Injectable } from '@angular/core'; 
import { Http, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import { Detail1b } from '../../components/detail1b/detail1b.component'; 
import 'rxjs/add/operator/map';
import { getBaseUrl } from '../../app.browser.module'; 
 
@Injectable() 
export class Detail1bService { 
 
  constructor(private http: Http) {     
  }
  
  getDetails(): Observable<Detail1b[]> {      
    return this.http.get(getBaseUrl() + 'api/Indicator1b/GetDetail') 
      .map( (res: Response) => { 
        let results = res.json().map( (item: Detail1b) => {           
          return new Detail1b(                   
            item.date, 
            item.name, 
            item.documenturl 
          ); 
        }); 
        return results; 
      }); 
  }
}