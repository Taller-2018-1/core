import { TestBed, inject } from '@angular/core/testing';

import { Detail1bService } from './detail1b.service';

describe('Detail1bService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Detail1bService]
    });
  });

  it('should be created', inject([Detail1bService], (service: Detail1bService) => {
    expect(service).toBeTruthy();
  }));
});
