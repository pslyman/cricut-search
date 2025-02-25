import { TestBed } from '@angular/core/testing';

import { GetMachinesService } from './get-machines.service';

describe('GetMachinesService', () => {
  let service: GetMachinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMachinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
