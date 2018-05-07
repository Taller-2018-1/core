import { Document } from './document';

export class Registry {
  registryID: number;
  activity: string;
  quantity: number;
  percent: number;

  dateAdded: Date;
  date: Date;
  name: string;
  urlDocuments: string[];

  constructor(dateAdded: Date, date: Date, name: string, urlDocuments: string[], quantity?: number, percent?: number ) {
    this.date = date;
    this.dateAdded = dateAdded;
    this.name = name;
    this.urlDocuments = urlDocuments;
    this.quantity = -1;
    this.percent = 0;
  }
}
