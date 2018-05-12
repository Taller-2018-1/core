import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorDisplayComponent } from './indicator-display.component';

describe('IndicatorDisplayComponent', () => {
  let component: IndicatorDisplayComponent;
  let fixture: ComponentFixture<IndicatorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
