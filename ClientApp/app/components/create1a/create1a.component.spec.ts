import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Create1aComponent } from './create1a.component';

describe('Create1aComponent', () => {
  let component: Create1aComponent;
  let fixture: ComponentFixture<Create1aComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create1aComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create1aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
