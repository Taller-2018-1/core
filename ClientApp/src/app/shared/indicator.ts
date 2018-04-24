import {IndicatorType} from './indicatorType';
import { Registry } from './registry';

export class Indicator {
    name: string;
    type: any;
    registries:  Registry [];
    constructor(name: string, type: IndicatorType) {
        this.name = name;
        this.registries = [];
        this.type = type;
    }

    addRegistry(date: Date, name: string, urlDocument: string, value?: number) {
        if (value) {
            this.registries.push(new Registry(date, name, urlDocument, value));
        }

        this.registries.push(new Registry(date, name, urlDocument));

    }

}
