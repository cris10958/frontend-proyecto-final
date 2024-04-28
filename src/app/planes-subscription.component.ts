import { Component, OnInit } from '@angular/core';
import {
  BeneficioPlanSubscripcion,
  PlanSubscripcion,
  PlanesSubscripcionService,
} from './planes-subscripcion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardPlanSubscripcionComponent } from './card-plan-subscripcion.component';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './usuario.service';

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
          <app-card-plan-subscripcion
            *ngFor="let plan of listPlanSubscripcion"
            [plan]="plan"
            (registrarPlan)="registrar_subscripcion($event)"
            [tipo]="'inicio'"
            class="col-4"
          >
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
export class PlanesSubscriptionComponent implements OnInit {
  listPlanSubscripcion: Array<PlanSubscripcion> = [];

  cargarPlanes() {
    this.planSubscripcionService.getPlanes().subscribe(
      (listPlanSubscripcion) => {
        this.listPlanSubscripcion = listPlanSubscripcion;
      },
      (error) => {
        if (error.code === 401) {
          this.usuarioService.logout();
          this.toastr.success(
            'Error',
            'Su sesión ha caducado, por favor vuelva a iniciar sesión.'
          );
        } else {
          this.toastr.success(
            'Error',
            'Ha ocurrido un error. ' + error.message
          );
        }
      }
    );
  }

  registrar_subscripcion(plan: string) {
    if (plan == 'Gratis') {
      this.router.navigate(['/panel-usuarios']);
    } else if (plan == 'Intermedio' || plan == 'Premium') {
      this.actualizarPlan(plan);
      this.router.navigate(['/panel-usuarios']);
    } else {
      this.toastr.success('Error', 'Selección invalida');
      return;
    }
  }

  actualizarPlan(plan: string) {
    this.planSubscripcionService.actualizarPlan(plan).subscribe(
      (result) => {
        this.toastr.success('En hora buena', 'Plan actualizado con exito');
      },
      (error) => {
        if (error.code === 401) {
          this.usuarioService.logout();
          this.toastr.success(
            'Error',
            'Su sesión ha caducado, por favor vuelva a iniciar sesión.'
          );
        } else {
          this.toastr.success(
            'Error',
            'Ha ocurrido un error. ' + error.message
          );
        }
      }
    );
  }

  ngOnInit(): void {
    this.cargarPlanes();
  }

  constructor(
    readonly planSubscripcionService: PlanesSubscripcionService,
    private router: Router,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) {}
}
