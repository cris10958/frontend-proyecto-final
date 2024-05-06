import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProductosServiciosComponent } from './detalle-productos-servicios.component';

describe('DetalleProductosServiciosComponent', () => {
  let component: DetalleProductosServiciosComponent;
  let fixture: ComponentFixture<DetalleProductosServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleProductosServiciosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleProductosServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
