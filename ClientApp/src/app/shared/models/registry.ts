import { Document } from './document';

export class Registry {
  registryID: number;
  dateAdded: Date;
  date: Date;
  name: string;
  value: number;
  indicatorID: number;
  documents: Document [] = new Array<Document>();
  discriminator: string;
  quantity: number;

  constructor() {
  }
}
