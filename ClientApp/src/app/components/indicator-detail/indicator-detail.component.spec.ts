import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorDetailComponent } from './indicator-detail.component';

describe('IndicatorDetailComponent', () => {
  let component: IndicatorDetailComponent;
  let fixture: ComponentFixture<IndicatorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
