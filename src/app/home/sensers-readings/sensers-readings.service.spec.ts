import { TestBed } from '@angular/core/testing';

import { SensersReadingsService } from './sensers-readings.service';

describe('SensersReadingsService', () => {
  let service: SensersReadingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensersReadingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
