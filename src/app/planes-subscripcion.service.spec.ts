import { TestBed } from '@angular/core/testing';

import { PlanesSubscripcionService } from './planes-subscripcion.service';

describe('PlanesSubscripcionService', () => {
  let service: PlanesSubscripcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanesSubscripcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
