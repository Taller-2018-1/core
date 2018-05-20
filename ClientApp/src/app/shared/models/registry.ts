import { Document } from './document';

export class Registry {
  dateAdded: Date;
  date: Date;
  name: string;
  value: number;
  links: string[];
  indicatorID: number;
  documents: Document [] = new Array<Document>();
  discriminator: string;
  quantity: number;
  registryID: number;
  activity: string;
  percent: number;

  constructor() {
  }
}
