import { TestBed, inject } from '@angular/core/testing';

import { Detalle1eService } from './detalle1e.service';

describe('Detalle1eService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Detalle1eService]
    });
  });

  it('should be created', inject([Detalle1eService], (service: Detalle1eService) => {
    expect(service).toBeTruthy();
  }));
});
