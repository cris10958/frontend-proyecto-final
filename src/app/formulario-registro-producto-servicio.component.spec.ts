import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRegistroProductoServicioComponent } from './formulario-registro-producto-servicio.component';

describe('FormularioRegistroProductoServicioComponent', () => {
  let component: FormularioRegistroProductoServicioComponent;
  let fixture: ComponentFixture<FormularioRegistroProductoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRegistroProductoServicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioRegistroProductoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
