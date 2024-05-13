import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioApliacionesExternasComponent } from './formulario-apliaciones-externas.component';

describe('FormularioApliacionesExternasComponent', () => {
  let component: FormularioApliacionesExternasComponent;
  let fixture: ComponentFixture<FormularioApliacionesExternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioApliacionesExternasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioApliacionesExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
