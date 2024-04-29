import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInformacionAlimenticiaComponent } from './formulario-informacion-alimenticia.component';

describe('FormularioInformacionAlimenticiaComponent', () => {
  let component: FormularioInformacionAlimenticiaComponent;
  let fixture: ComponentFixture<FormularioInformacionAlimenticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioInformacionAlimenticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioInformacionAlimenticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
