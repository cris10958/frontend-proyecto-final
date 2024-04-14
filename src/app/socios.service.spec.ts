import { TestBed } from '@angular/core/testing';

import { SociosService } from './socios.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SociosService', () => {
  let service: SociosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule]
    });
    service = TestBed.inject(SociosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
