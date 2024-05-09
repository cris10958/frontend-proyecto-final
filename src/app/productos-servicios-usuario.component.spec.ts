import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosServiciosUsuarioComponent } from './productos-servicios-usuario.component';

describe('ProductosServiciosUsuarioComponent', () => {
  let component: ProductosServiciosUsuarioComponent;
  let fixture: ComponentFixture<ProductosServiciosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosServiciosUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductosServiciosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
