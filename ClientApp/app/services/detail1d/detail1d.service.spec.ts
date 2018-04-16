import { TestBed, inject } from '@angular/core/testing';

import { Detail1dService } from './detail1d.service';

describe('Detalle1dService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Detail1dService]
    });
  });

  it('should be created', inject([Detail1dService], (service: Detail1dService) => {
    expect(service).toBeTruthy();
  }));
});