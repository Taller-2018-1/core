import { Document } from './document';

export class Registry {
  registryID: number;
  dateAdded: Date;
  date: Date;
  name: string;
  value: number;
  indicatorID: number;
  urlDocuments: string[];
  discriminator: string;
  quantity: number;

  constructor() {
  }
}
