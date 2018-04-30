import { Document } from './document';

export class Registry {
    dateAdded: Date;
    date: Date;
    name: string;
    value: number;
    links: string[];
    documents: Document[] = new Array<Document>();

    constructor() { }
}
