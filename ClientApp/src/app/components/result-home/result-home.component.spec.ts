import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultHomeComponent } from './result-home.component';

describe('ResultHomeComponent', () => {
  let component: ResultHomeComponent;
  let fixture: ComponentFixture<ResultHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
