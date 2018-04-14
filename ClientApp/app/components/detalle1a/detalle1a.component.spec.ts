import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detalle1aComponent } from './detalle1a.component';

describe('Detalle1aComponent', () => {
  let component: Detalle1aComponent;
  let fixture: ComponentFixture<Detalle1aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detalle1aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detalle1aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
