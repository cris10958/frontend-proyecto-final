import { TestBed } from '@angular/core/testing';

import { ProductosServiciosService } from './productos-servicios.service';

describe('ProductosServiciosService', () => {
  let service: ProductosServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
