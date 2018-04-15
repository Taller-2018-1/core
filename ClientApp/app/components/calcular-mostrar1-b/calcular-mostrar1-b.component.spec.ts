import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularMostrar1BComponent } from './calcular-mostrar1-b.component';

describe('CalcularMostrar1BComponent', () => {
  let component: CalcularMostrar1BComponent;
  let fixture: ComponentFixture<CalcularMostrar1BComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcularMostrar1BComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularMostrar1BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
