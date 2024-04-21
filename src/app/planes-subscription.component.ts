import { Component } from '@angular/core';
import { PlanesSubscripcionService } from './planes-subscripcion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardPlanSubscripcionComponent } from './card-plan-subscripcion.component';

@Component({
  selector: 'app-planes-subscription',
  standalone: true,
  imports: [CommonModule, CardPlanSubscripcionComponent],
  template: `
    <div class="fd-color h-total w-100 row justify-content-center pb-5">
      <div class="col-10 pt-5">
        <div class="row-col-12 text-start">
          <a href="/home">
            <img src="./assets/icon/Brand.png" class="ico-brand-w" alt="logo" />
          </a>
        </div>
        <div class="row-col-12 text-center pt-3 pb-3">
          <h1>Planes de subscripción</h1>
        </div>
        <div class="row justify-content-center pt-3 pb-3">
          <app-card-plan-subscripcion *ngFor="let plan of planSubscripcion.planSubscripcion" [plan] = "plan" class="col-4">
          </app-card-plan-subscripcion>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .contenido-tarjeta {
        max-height: 50vh;
        overflow: auto;
      }
    `,
  ],
})
export class PlanesSubscriptionComponent {
  registrar_subscripcion(id: string) {
    if (id == '1') {
      this.router.navigate(['/home-usuario']);
    } else if (id == '2' || id == '3') {
      alert('Actualizar plan');
      this.router.navigate(['/home-usuario']);
    } else {
      console.log('Valor invalido');
      return;
    }
  }

  constructor(
    readonly planSubscripcion: PlanesSubscripcionService,
    private router: Router
  ) {}
}
