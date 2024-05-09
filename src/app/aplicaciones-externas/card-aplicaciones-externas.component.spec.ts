import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAplicacionesExternasComponent } from './card-aplicaciones-externas.component';

describe('CardAplicacionesExternasComponent', () => {
  let component: CardAplicacionesExternasComponent;
  let fixture: ComponentFixture<CardAplicacionesExternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAplicacionesExternasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardAplicacionesExternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
