import { TestBed, inject } from '@angular/core/testing';

import { ComputeShow1BService } from './compute-show1-b.service';

describe('ComputeShow1BService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComputeShow1BService]
    });
  });

  it('should be created', inject([ComputeShow1BService], (service: ComputeShow1BService) => {
    expect(service).toBeTruthy();
  }));
});
