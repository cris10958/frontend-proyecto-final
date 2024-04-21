import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { PlanSubscripcion } from './planes-subscripcion.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-card-plan-subscripcion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="id-inicial-div" class="col-12">
      <div class="fd-color white p-0 shadow rounded">
        <div [id]="'id-plan-'+plan.id_plan_subscripcion"
          class="fd-color rounded-top p-3 text-center"
          [class]="{'primary_container': plan.id_plan_subscripcion == '1', 'on_primary_fixed_variant': plan.id_plan_subscripcion == '2', 'on_primary_container': plan.id_plan_subscripcion == '3', }"
        >
          <h1>{{ plan.nombre }}</h1>
        </div>
        <div [id]="'id-plan-content-'+plan.id_plan_subscripcion" class="rounded-bottom pb-3 pt-2">
          <div class="col-12 contenido-tarjeta pe-5 ps-2">
            <ul>
              <li *ngFor="let beneficio of plan.beneficios" class="tx-justify">
                {{ beneficio.beneficios }}
              </li>
            </ul>
          </div>
          <div
            *ngIf="plan.id_plan_subscripcion == '1'"
            class="col-12 text-center ps-4 pt-5"
          >
            <button
              [id]="'id-bt-'+plan.id_plan_subscripcion"
              class="btn btn-primary"
              type="submit"
              (click)="registrar_subscripcion(plan.id_plan_subscripcion)"
            >
              Continuar gratis
            </button>
          </div>
          <div
            *ngIf="
              plan.id_plan_subscripcion == '2' ||
              plan.id_plan_subscripcion == '3'
            "
            class="col-12 text-center ps-4 pt-5"
          >
            <button
            [id]="'id-bt-'+plan.id_plan_subscripcion"
              class="btn btn-primary"
              type="submit"
              (click)="registrar_subscripcion(plan.id_plan_subscripcion)"
            >
              Subscribirme
            </button>
          </div>
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
export class CardPlanSubscripcionComponent implements OnInit {
  @Input() plan!: PlanSubscripcion;
  @Output() registrarPlan = new EventEmitter<string>();

  ngOnInit(): void {}

  registrar_subscripcion(id: string) {
    this.registrarPlan.emit(id);
  }
}
