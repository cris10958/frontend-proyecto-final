import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaDetalleSesionComponent } from './tarjeta-detalle-sesion.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('TarjetaDetalleSesionComponent', () => {
  let component: TarjetaDetalleSesionComponent;
  let fixture: ComponentFixture<TarjetaDetalleSesionComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaDetalleSesionComponent, RouterModule.forRoot([]),HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarjetaDetalleSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
