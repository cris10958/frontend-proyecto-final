import { TestBed } from '@angular/core/testing';

import { PerfilamientoService } from './perfilamiento.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PerfilamientoService', () => {
  let service: PerfilamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule]
    });
    service = TestBed.inject(PerfilamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
