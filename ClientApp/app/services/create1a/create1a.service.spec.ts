import { TestBed, inject } from '@angular/core/testing';

import { Create1aService } from './create1a.service';

describe('Create1aService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Create1aService]
    });
  });

  it('should be created', inject([Create1aService], (service: Create1aService) => {
    expect(service).toBeTruthy();
  }));
});
