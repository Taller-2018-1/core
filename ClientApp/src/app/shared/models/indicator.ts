import { Registry } from './registry';
import { Goal } from './goal';

export class Indicator {
    indicatorID: number;
    name: string;
    registriesName: string;
    registriesType: number;
    registries:  Registry [] = new Array<Registry>();
    goals: Goal[] = new Array<Goal>();
    isExternal = false;

  constructor() { }

}
