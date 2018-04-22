import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail1EComponent } from './detail1e.component';

describe('Detalle1eComponent', () => {
  let component: Detail1EComponent;
  let fixture: ComponentFixture<Detail1EComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail1EComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail1EComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
