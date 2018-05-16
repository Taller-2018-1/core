import { Indicator } from './indicator';

export class IndicatorGroup {
    indicatorGroupID: number;
    name: string;
    indicators:  Indicator [] = new Array<Indicator>();

    constructor() { }

}
