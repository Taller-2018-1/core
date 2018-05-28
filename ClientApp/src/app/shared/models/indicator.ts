import { Registry } from './registry';
import { Goal } from './goal';

export class Indicator {
    indicatorID: number;
    name: string;
    registriesType: number;
    registries:  Registry [] = new Array<Registry>();
    goals: Goal[] = new Array<Goal>();

  constructor() { }

}
