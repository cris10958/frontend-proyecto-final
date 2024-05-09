import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicacionesExternasComponent } from './aplicaciones-externas.component';

describe('AplicacionesExternasComponent', () => {
  let component: AplicacionesExternasComponent;
  let fixture: ComponentFixture<AplicacionesExternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AplicacionesExternasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AplicacionesExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
