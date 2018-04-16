import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail1eComponent } from './detail1e.component';

describe('Detalle1eComponent', () => {
  let component: Detail1eComponent;
  let fixture: ComponentFixture<Detail1eComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail1eComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail1eComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
