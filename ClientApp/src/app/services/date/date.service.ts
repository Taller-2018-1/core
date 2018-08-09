// Adapted from: https://gist.github.com/tborychowski/83a50500a30a41a7a95f

import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  months = [
    { shortName: 'ene.', name: 'Enero' },
    { shortName: 'feb.', name: 'Febrero' },
    { shortName: 'mar.', name: 'Marzo' },
    { shortName: 'abr.', name: 'Abril' },
    { shortName: 'may.', name: 'Mayo' },
    { shortName: 'jun.', name: 'Junio' },
    { shortName: 'jul.', name: 'Julio' },
    { shortName: 'ago.', name: 'Agosto' },
    { shortName: 'sep.', name: 'Septiembre' },
    { shortName: 'oct.', name: 'Octubre' },
    { shortName: 'nov.', name: 'Noviembre' },
    { shortName: 'dic.', name: 'Deciembre' }
  ];

  constructor() { }

  // add n days to a date
  addDays(date: Date, n: number): Date {
    const d = new Date(date);
    d.setDate(date.getDate() + (n || 0));
    return d;
  }

  // add n months to a date
  addMonths(date: Date, n: number): Date {
    const d = new Date(date);
    d.setMonth(d.getMonth() + (n || 0), 1);
    return d;
  }

  // Returns ISO 8601 week number and year
  getWeekISO8601(date: Date): number {
    let jan1, w;
    const d = new Date(date);

    // Set to nearest Thursday: current date + 4 - current day number, make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));

    // Get first day of year
    jan1 = new Date(d.getFullYear(), 0, 1);

    // Calculate full weeks to nearest Thursday
    w = Math.ceil((((d.valueOf() - jan1) / 86400000) + 1) / 7);

    return w;
  }

  getWeeksInYearISO8601 (y: number): number {
    return this.getWeekISO8601(new Date(y, 11, 28));
  }

  /**
  * Calculates the date for a Monday of the given week and year
  */
  getDateFromWeek (y: number, w: number): Date {
    const dayN = 1;
    const j10 = new Date(y, 0, 10);
    const j4 = new Date(y, 0, 4);
    const mon1 = +j4 - j10.getDay() * 86400000;

    return new Date(mon1 + ((w - 1) * 7 + dayN) * 86400000);
  }

  getStrDateFromWeek (y: number, w: number): string {
    const d = this.getDateFromWeek(y, w);
    return d.getDate() + ' ' + this.months[d.getMonth()].shortName;
  }

  getShortStrDateFromWeek (y: number, w: number): string {
    const d = this.getDateFromWeek(y, w);
    return d.getDate() + '/' + ('0' + (d.getMonth() + 1)).slice(-2);
  }

  /* unix time is calculated in miliseconds */
  toUnix(date: Date): number { return +date; }

  // parse string date: 31-01-2011
  toDate (s: string): Date {
    const a = s.split('-');
    return new Date(+a[2], +a[1] - 1, +a[0]);
  }

  // parse string date: 31/01/2011
  toDate2 (s: string): Date {
    const a = s.split('/');
    return new Date(+a[2], +a[1] - 1, +a[0]);
  }

  stringToUnix(s: string): number { return +this.toDate(s); }
  numberToDate(n: number): Date { return new Date(n); }

  // substract dates in format: 2010-02-15 and return difference in days
  diffDate(d1: Date, d2: Date): number {
    if (!d1 || !d2) {
      return 0;
    }
    return Math.round((this.toUnix(d1) - this.toUnix(d2)) / 86400000);
  }


}
