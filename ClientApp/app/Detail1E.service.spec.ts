import { TestBed, inject } from '@angular/core/testing';

import { Detail1E } from './Detail1E.service';

describe('Detail1EService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Detail1E]
    });
  });

  it('should be created', inject([Detail1E], (service: Detail1E) => {
    expect(service).toBeTruthy();
  }));
});
