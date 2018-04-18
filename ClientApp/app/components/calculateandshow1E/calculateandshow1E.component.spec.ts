import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { calculateandshow1Ecomponent } from './calculateandshow1E.component';

describe('CalcularMostrarIndicador1EComponent', () => {
  let component: calculateandshow1Ecomponent;
  let fixture: ComponentFixture<calculateandshow1Ecomponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ calculateandshow1Ecomponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(calculateandshow1Ecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
