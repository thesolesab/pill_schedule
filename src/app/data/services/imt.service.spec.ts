import { TestBed } from '@angular/core/testing';

import { ImtService } from './imt.service';

describe('ImtService', () => {
  let service: ImtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
