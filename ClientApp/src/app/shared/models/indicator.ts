import { IndicatorType } from './indicatorType';
import { Registry } from './registry';
import { Goal } from './goal';

export class Indicator {
    indicatorID: number;
    name: string;
    type: any;
    registries:  Registry [] = new Array<Registry>();
    goals: Goal[] = new Array<Goal>();

  constructor() { }

}
