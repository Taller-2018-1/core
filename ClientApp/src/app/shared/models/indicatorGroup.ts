import { Indicator } from './';

export class IndicatorGroup {
    indicatorGroupID: number;
    name: string;
    indicators:  Indicator [] = new Array<Indicator>();

    constructor() { }

}
