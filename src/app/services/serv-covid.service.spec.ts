import { TestBed } from '@angular/core/testing';

import { ServCovidService } from './serv-covid.service';

describe('ServCovidService', () => {
  let service: ServCovidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServCovidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
