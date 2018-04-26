import { TestBed, inject } from '@angular/core/testing';

import { Indicator1Service } from './indicator1.service';

describe('Indicator1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Indicator1Service]
    });
  });

  it('should be created', inject([Indicator1Service], (service: Indicator1Service) => {
    expect(service).toBeTruthy();
  }));
});
