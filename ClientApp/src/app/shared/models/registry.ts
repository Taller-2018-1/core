export class Registry {
  registryID: number;
  dateAdded: Date;
  date: Date;
  name: string;
  value: number;
  urlDocuments: string[];

  constructor(dateAdded: Date, date: Date, name: string, urlDocuments: string[], value?: number) {
    this.date = date;
    this.dateAdded = dateAdded;
    this.name = name;
    this.urlDocuments = urlDocuments;
    this.value = -1;
  }
}
