import {IndicatorType} from './indicatorType';
import { Registry } from './registry';

export class Indicator {
    indicatorID: number;
    name: string;
    type: any;
    registries:  Registry [] = new Array<Registry>();

    constructor() { }

}
