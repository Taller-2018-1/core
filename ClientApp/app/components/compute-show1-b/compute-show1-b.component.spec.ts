import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputeShow1BComponent } from './compute-show1-b.component';

describe('ComputeShow1BComponent', () => {
  let component: ComputeShow1BComponent;
  let fixture: ComponentFixture<ComputeShow1BComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputeShow1BComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputeShow1BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
