import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detalle1dComponent } from './detalle1d.component';

describe('Detalle1dComponent', () => {
  let component: Detalle1dComponent;
  let fixture: ComponentFixture<Detalle1dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detalle1dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detalle1dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
