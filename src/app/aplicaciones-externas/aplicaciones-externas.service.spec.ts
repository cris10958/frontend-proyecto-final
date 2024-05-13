import { TestBed } from '@angular/core/testing';

import { AplicacionesExternasService } from './aplicaciones-externas.service';

describe('AplicacionesExternasService', () => {
  let service: AplicacionesExternasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AplicacionesExternasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
