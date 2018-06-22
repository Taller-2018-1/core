import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';



@Injectable()
export class SessionService {

  static YEAR_KEY = 'selectedYear';
  static YEAR_TEXT_KEY = 'selectedYearText';
  static MONTH_KEY = 'selectedMonth';
  static MONTH_TEXT_KEY = 'selectedMonthText';


  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }

  public isYearSaved(): boolean {
    return this.storage.has(SessionService.YEAR_KEY);
  }

  public isYearTextSaved(): boolean {
    return this.storage.has(SessionService.YEAR_TEXT_KEY);
  }

  public isMonthSaved(): boolean {
    return this.storage.has(SessionService.MONTH_KEY);
  }

  public isMonthTextSaved(): boolean {
    return this.storage.has(SessionService.MONTH_TEXT_KEY);
  }

  public getYear(defaultYear: number): number {
    if (this.isYearSaved()) {
      return this.storage.get(SessionService.YEAR_KEY);
    }
    else {
      this.storage.set(SessionService.YEAR_KEY, defaultYear);
      return defaultYear;
    }
  }

  public getYearText(defaultYear: string): string {
    if (this.isYearTextSaved()) {
      return this.storage.get(SessionService.YEAR_TEXT_KEY);
    }
    else {
      this.storage.set(SessionService.YEAR_TEXT_KEY, defaultYear);
      return defaultYear;
    }
  }

  public getMonth(defaultMonth: number): number {
    if (this.isMonthSaved()) {
      return this.storage.get(SessionService.MONTH_KEY);
    }
    else {
      this.storage.set(SessionService.MONTH_KEY, defaultMonth);
      return defaultMonth;
    }
  }

  public getMonthText(defaultMonth: string): string {
    if (this.isMonthTextSaved()) {
      return this.storage.get(SessionService.MONTH_TEXT_KEY);
    }
    else {
      this.storage.set(SessionService.MONTH_TEXT_KEY, defaultMonth);
      return defaultMonth;
    }
  }

  public setYear(year: number) {
    this.storage.set(SessionService.YEAR_KEY, year);
  }
  
  public setYearText(text: string) {
    this.storage.set(SessionService.YEAR_TEXT_KEY, text);
  }

  public setMonth(month: number) {
    this.storage.set(SessionService.MONTH_KEY, month);
  }

  public setMonthText(month: string) {
    this.storage.set(SessionService.MONTH_TEXT_KEY, month);
  }
}
