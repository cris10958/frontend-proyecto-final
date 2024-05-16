import { Component, OnInit } from '@angular/core';
import { PlanSubscripcion, PlanesSubscripcionService } from './planes-subscripcion.service';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CardPlanSubscripcionComponent } from './card-plan-subscripcion.component';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-plan-subscripcion-actual',
  standalone: true,
  imports: [CommonModule, CardPlanSubscripcionComponent],
  template: `
    <div class="fd-color h-total w-100 row justify-content-center pb-5">
      <div class="col-12">
        <div class="row-col-12 text-center pt-3 pb-3">
          <h1>Plan actual</h1>
        </div>
        <div class="row justify-content-center pt-3 pb-3">
          <app-card-plan-subscripcion
            *ngFor="let plan of PlanActual; let i = index;"
            [plan]="plan"
            (registrarPlan)="actualizar_subscripcion($event)"
            [tipo] = "'actual'"
            [index]="i"
            class="col-6"
          >
          </app-card-plan-subscripcion>
        </div>
        <div class="row-col-12 text-center pt-3 pb-3">
          <h1>Planes disponibles</h1>
        </div>
        <div class="row justify-content-center pt-3 pb-3">
          <app-card-plan-subscripcion
            *ngFor="let plan of listPlanSubscripcion; let i = index;"
            [plan]="plan"
            (registrarPlan)="actualizar_subscripcion($event)"
            [tipo] = "'actualizacion'"
            [index]="i + 1"
            class="col-6"
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
export class PlanSubscripcionActualComponent implements OnInit{
  listPlanSubscripcion: Array<PlanSubscripcion> = [];
  PlanActual: Array<PlanSubscripcion> = [];

  cargarPlanesDiponibles() {
    this.planSubscripcionService.getPlanDisponibles().subscribe(
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

  cargarPlanesActual() {
    this.planSubscripcionService.getPlanActual().subscribe(
      (PlanActual) => {
        this.PlanActual = PlanActual;
        this.cargarPlanesDiponibles();
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

  actualizar_subscripcion(plan: string) {
    this.actualizarPlan(plan);
  }

  actualizarPlan(plan: string) {
    this.planSubscripcionService.actualizarPlan(plan).subscribe(
      (result) => {
        this.toastr.success('En hora buena', 'Plan actualizado con exito');
        this.cargarPlanesActual();
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
  }

  constructor(
    readonly planSubscripcionService: PlanesSubscripcionService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) {}

}
