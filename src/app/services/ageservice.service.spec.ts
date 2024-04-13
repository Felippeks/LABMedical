import { TestBed } from '@angular/core/testing';

import { AgeserviceService } from './ageservice.service';

describe('AgeserviceService', () => {
  let service: AgeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
