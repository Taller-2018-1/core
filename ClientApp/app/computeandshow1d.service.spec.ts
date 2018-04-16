import { TestBed, inject } from '@angular/core/testing';

import { Computeandshow1dService } from './computeandshow1d.service';

describe('Calcularmostrar1DService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Computeandshow1dService]
    });
  });

  it('should be created', inject([Computeandshow1dService], (service: Computeandshow1dService) => {
    expect(service).toBeTruthy();
  }));
});
