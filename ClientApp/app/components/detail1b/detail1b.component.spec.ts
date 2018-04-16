import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail1bComponent } from './detail1b.component';

describe('Detail1bComponent', () => {
  let component: Detail1bComponent;
  let fixture: ComponentFixture<Detail1bComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail1bComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail1bComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
