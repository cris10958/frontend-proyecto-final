import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInformacionDeportivaComponent } from './formulario-informacion-deportiva.component';

describe('FormularioInformacionDeportivaComponent', () => {
  let component: FormularioInformacionDeportivaComponent;
  let fixture: ComponentFixture<FormularioInformacionDeportivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioInformacionDeportivaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioInformacionDeportivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
