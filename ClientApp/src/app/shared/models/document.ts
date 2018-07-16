export class Document {
  documentID: number;
  name: string;
  documentName: string;
  extension: string;
  link: string;
  date: Date;
  code: string;

  constructor() { }

  fromJSON(json) {
    for (const propName of json) {
      this[propName] = json[propName];
    }

    return this;
  }
}
