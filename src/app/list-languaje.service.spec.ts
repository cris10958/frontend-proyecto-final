import { TestBed } from '@angular/core/testing';

import { ListLanguajeService } from './list-languaje.service';

describe('ListLanguajeService', () => {
  let service: ListLanguajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListLanguajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
