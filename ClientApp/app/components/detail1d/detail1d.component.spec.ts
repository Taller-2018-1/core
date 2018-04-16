import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail1dComponent } from './detail1d.component';

describe('Detalle1dComponent', () => {
  let component: Detail1dComponent;
  let fixture: ComponentFixture<Detail1dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail1dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail1dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
