import { TestBed } from '@angular/core/testing';

import { PerfilamientoService } from './perfilamiento.service';

describe('PerfilamientoService', () => {
  let service: PerfilamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
