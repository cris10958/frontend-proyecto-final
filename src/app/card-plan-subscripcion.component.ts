import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { PlanSubscripcion } from './planes-subscripcion.service';
import { Route } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-plan-subscripcion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="id-inicial-div" class="col-12">
      <div class="fd-color white p-0 shadow rounded">
        <div [id]="'id-plan-'+plan.nombre"
          class="fd-color rounded-top p-3 text-center"
          [class]="{'primary_container': plan.nombre == 'Gratis', 'on_primary_fixed_variant': plan.nombre == 'Intermedio', 'on_primary_container': plan.nombre == 'Premium', }"
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
            *ngIf="plan.nombre == 'Gratis'"
            class="col-12 text-center ps-4 pt-5"
          >
            <button
              [id]="'id-bt-'+plan.id_plan_subscripcion"
              class="btn btn-primary"
              type="submit"
              (click)="registrar_subscripcion(plan.nombre)"
            >
              Continuar gratis
            </button>
          </div>
          <div
            *ngIf="
              plan.nombre == 'Intermedio' ||
              plan.nombre == 'Premium'
            "
            class="col-12 text-center ps-4 pt-5"
          >
            <button
            [id]="'id-bt-'+plan.nombre"
              class="btn btn-primary"
              type="submit"
              (click)="registrar_subscripcion(plan.nombre)"
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

  ngOnInit(): void {
  }

  registrar_subscripcion(plan: string) {
    this.registrarPlan.emit(plan);
  }

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService){}

}
