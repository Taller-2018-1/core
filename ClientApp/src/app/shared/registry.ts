export class Registry {
    date: Date;
    name: string;
    value: number;
    urlDocument: string;

    constructor(date: Date, name: string, urlDocument: string, value?: number) {
        this.date = date;
        this.name = name;
        this.urlDocument = urlDocument;
        this.value = -1;
    }
}
