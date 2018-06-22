import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelgeneratorComponent } from './excelgenerator.component';

describe('ExcelgeneratorComponent', () => {
  let component: ExcelgeneratorComponent;
  let fixture: ComponentFixture<ExcelgeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelgeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelgeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
