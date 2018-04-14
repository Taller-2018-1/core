import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detalle1eComponent } from './detalle1e.component';

describe('Detalle1eComponent', () => {
  let component: Detalle1eComponent;
  let fixture: ComponentFixture<Detalle1eComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detalle1eComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detalle1eComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
