import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularMostrarIndicador1EComponent } from './calcular-mostrar-indicador1-e.component';

describe('CalcularMostrarIndicador1EComponent', () => {
  let component: CalcularMostrarIndicador1EComponent;
  let fixture: ComponentFixture<CalcularMostrarIndicador1EComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcularMostrarIndicador1EComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularMostrarIndicador1EComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
