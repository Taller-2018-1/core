import {IndicatorType} from './indicatorType';
import { Registry } from './registry';

export class Indicator {
  name: string;
  type: number;
  registries:  Registry [] = new Array<Registry>();

  constructor() { }

  addRegistry(dateAdded: Date, date: Date, name: string, urlDocuments: string[], value?: number) {
    if (value) {
        this.registries.push(new Registry(dateAdded, date, name, urlDocuments, value));
    }

    this.registries.push(new Registry(dateAdded, date, name, urlDocuments));
  }

  deleteRegistry(registry: Registry) {
    const index: number = this.registries.indexOf(registry);
    if ( index !== -1) {
        this.registries.splice(index, 1);
    }
  }

}
