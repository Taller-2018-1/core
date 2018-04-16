import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputeAndShow1dComponent } from './computeandshow1d.component';

describe('ComputeAndShow1dComponent', () => {
  let component: ComputeAndShow1dComponent;
  let fixture: ComponentFixture<ComputeAndShow1dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputeAndShow1dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputeAndShow1dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
