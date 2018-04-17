import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail1aComponent } from './detail1a.component';

describe('Detail1aComponent', () => {
  let component: Detail1aComponent;
  let fixture: ComponentFixture<Detail1aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail1aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail1aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
