import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail1BComponent } from './detail1b.component';

describe('Detail1BComponent', () => {
  let component: Detail1BComponent;
  let fixture: ComponentFixture<Detail1BComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detail1BComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detail1BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
