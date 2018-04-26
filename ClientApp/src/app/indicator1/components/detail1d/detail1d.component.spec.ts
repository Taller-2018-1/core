import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail1DComponent } from './detail1d.component';

describe('Detalle1dComponent', () => {
  let component: Detail1DComponent;
  let fixture: ComponentFixture<Detail1DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail1DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail1DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
