import { TestBed, inject } from '@angular/core/testing';

import { Indicator1GroupService } from './indicator1-group.service';

describe('Indicator1GroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Indicator1GroupService]
    });
  });

  it('should be created', inject([Indicator1GroupService], (service: Indicator1GroupService) => {
    expect(service).toBeTruthy();
  }));
});
