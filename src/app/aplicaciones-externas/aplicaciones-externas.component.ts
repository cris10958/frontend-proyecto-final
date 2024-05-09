import { Component } from '@angular/core';
import { CardAplicacionesExternasComponent } from './card-aplicaciones-externas.component';
import { FormularioApliacionesExternasComponent } from './formulario-apliaciones-externas.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aplicaciones-externas',
  standalone: true,
  imports: [
    CardAplicacionesExternasComponent,
    FormularioApliacionesExternasComponent,
    CommonModule,
  ],
  template: `
    <div
      class="row-col-12 w-100"
      [class]="{
        'fd-color': agregarAppExterna,
        primary_container: agregarAppExterna
      }"
    >
      <div class="row-col-12 w-100 ps-5 pt-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Mi perfil</a></li>
            <li
              class="breadcrumb-item"
              [class]="{ active: !agregarAppExterna }"
              aria-current="page"
            >
              <a *ngIf="agregarAppExterna" href="#"
                >Integración apps externas</a
              >
              <label *ngIf="!agregarAppExterna"
                >Integración apps externas</label
              >
            </li>
            <li
              class="breadcrumb-item active"
              *ngIf="agregarAppExterna"
              aria-current="page"
            >
              Registro
            </li>
          </ol>
        </nav>
      </div>
      <div *ngIf="!agregarAppExterna" class="row pt-3 pb-0">
        <div class="col-10 text-center">
          <h1>Aplicaciones externas registradas</h1>
        </div>
        <div class="col-2">
          <button
            id="id-bt-add-app-ext"
            (click)="registroAppExterna()"
            class="btn btn-primary"
          >
            Agregar
          </button>
        </div>
      </div>
      <div class="row pt-3 justify-content-center">
        <div *ngIf="agregarAppExterna" class="col-10 pb-5">
          <app-formulario-apliaciones-externas></app-formulario-apliaciones-externas>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AplicacionesExternasComponent {
  agregarAppExterna: boolean = false;

  registroAppExterna() {
    this.agregarAppExterna = true;
  }
}
