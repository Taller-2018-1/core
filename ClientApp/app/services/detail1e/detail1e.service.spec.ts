import { TestBed, inject } from '@angular/core/testing';

import { Detail1eService } from './detail1e.service';

describe('Detalle1eService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Detail1eService]
    });
  });

  it('should be created', inject([Detail1eService], (service: Detail1eService) => {
    expect(service).toBeTruthy();
  }));
});
