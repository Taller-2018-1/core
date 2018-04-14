import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularMostrar1DComponent } from './calcular-mostrar1-d.component';

describe('CalcularMostrar1DComponent', () => {
  let component: CalcularMostrar1DComponent;
  let fixture: ComponentFixture<CalcularMostrar1DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcularMostrar1DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularMostrar1DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
