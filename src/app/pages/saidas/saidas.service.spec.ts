import { TestBed } from '@angular/core/testing';

import { SaidasService } from './saidas.service';

describe('SaidasService', () => {
  let service: SaidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
