import { TestBed, inject } from '@angular/core/testing';

import { Detail1aService } from './detail1a.service';

describe('Detail1aService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Detail1aService]
    });
  });

  it('should be created', inject([Detail1aService], (service: Detail1aService) => {
    expect(service).toBeTruthy();
  }));
});
