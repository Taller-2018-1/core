import { Component, OnInit } from '@angular/core'; 
import { Http } from '@angular/http'; 
import { Detail1bService } from '../../services/detail1b/detail1b.service'; 
import { getBaseUrl } from '../../app.browser.module'; 
import { Observable } from 'rxjs/Observable'; 
 
@Component({ 
  selector: 'detail1b', 
  templateUrl: './detail1b.component.html', 
  providers: [Detail1bService] 
}) 
export class Detail1bComponent implements OnInit { 
 
  public details: Observable<Detail1b[]> = new Observable(); 
 
  constructor(private service: Detail1bService) { 
  } 

  ngOnInit() {     
    this.details = this.getDetails(); 
  } 
 
  getDetails(): Observable<Detail1b[]> { 
    return this.service.getDetails(); 
  } 
 
}  
export class Detail1b{ 
  date: string; 
  name: string; 
  documenturl: string; 
 
  constructor(date: string, name: string, documenturl: string){       
    this.date = date; 
    this.name = name; 
    this.documenturl = documenturl; 
  } 
} 