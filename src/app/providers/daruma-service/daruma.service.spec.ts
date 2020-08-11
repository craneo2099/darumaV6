import { TestBed } from '@angular/core/testing';

import { DarumaService } from './daruma.service';

describe('DarumaService', () => {
  let service: DarumaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarumaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
