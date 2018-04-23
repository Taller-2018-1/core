import { TestBed, inject } from '@angular/core/testing';

import { IndicatorDetailService } from './indicator-detail.service';

describe('IndicatorDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndicatorDetailService]
    });
  });

  it('should be created', inject([IndicatorDetailService], (service: IndicatorDetailService) => {
    expect(service).toBeTruthy();
  }));
});
