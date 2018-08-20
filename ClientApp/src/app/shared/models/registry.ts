import { Document } from './document';

export class Registry {
  registryID: number;
  indicatorID: number;
  name: string;
  dateAdded: Date;
  date: Date;
  documents: Document [] = new Array<Document>();
  discriminator: string;
  quantity: number;
  percent: number;

  constructor(dateAdded?: Date, date?: Date, name?: string,
     quantity?: number, percent?: number ) {
    this.date = date;
    this.dateAdded = dateAdded;
    this.name = name;
    this.quantity = 0;
    this.percent = 0;
  }
}
