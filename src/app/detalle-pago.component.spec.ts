import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePagoComponent } from './detalle-pago.component';

describe('DetallePagoComponent', () => {
  let component: DetallePagoComponent;
  let fixture: ComponentFixture<DetallePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
