import { Component, OnInit, ViewChild } from '@angular/core';
import { CardAplicacionesExternasComponent } from './card-aplicaciones-externas.component';
import { FormularioApliacionesExternasComponent } from './formulario-apliaciones-externas.component';
import { CommonModule } from '@angular/common';
import {
  AplicacionesExternasService,
  ListAppExternas,
} from './aplicaciones-externas.service';
import { error } from 'console';

@Component({
  selector: 'app-aplicaciones-externas',
  standalone: true,
  imports: [
    CardAplicacionesExternasComponent,
    FormularioApliacionesExternasComponent,
    CommonModule,
    CardAplicacionesExternasComponent,
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
          <app-formulario-apliaciones-externas
            [actualizacion]="actualizacion"
            [detalle_app]="detalle_app_externa"
            (cerrarRegistro)="cerrarRegistro($event)"
          ></app-formulario-apliaciones-externas>
        </div>
        <div *ngIf="!agregarAppExterna" class="row pt-3">
          <div class="col-4 pb-5" *ngFor="let app of list_aplicaciones">
            <app-card-aplicaciones-externas
              [detalle_app]="app"
              (click)="openDetalle(app)"
            ></app-card-aplicaciones-externas>
          </div>
        </div>
        <div class="row-col-12 text-start pt-1 ng-star-inserted ps-5 ms-4" *ngIf="sin_aplicaciones && !agregarAppExterna">
          <span class="color-letra-gray-900 small">
            Sin aplicaciones externas registradas
          </span>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class AplicacionesExternasComponent implements OnInit {
  agregarAppExterna: boolean = false;
  sin_aplicaciones: boolean = false;
  list_aplicaciones: Array<ListAppExternas> = [];
  detalle_app_externa_inicial: ListAppExternas = {
    id: '',
    nombre: '',
    descripcion: '',
    webhook: '',
    token: '',
    estado: '',
    fecha_modificacion: '',
  };
  detalle_app_externa = this.detalle_app_externa_inicial;
  actualizacion: boolean = false;

  @ViewChild(FormularioApliacionesExternasComponent)
  childDetalleApp!: FormularioApliacionesExternasComponent;

  registroAppExterna() {
    this.agregarAppExterna = true;
    this.detalle_app_externa = this.detalle_app_externa_inicial;
    this.actualizacion = false;
  }

  cerrarRegistro(valor: string) {
    this.agregarAppExterna = false;
    this.getAplicaciones();
    this.detalle_app_externa = this.detalle_app_externa_inicial;
  }

  getAplicaciones() {
    this.sin_aplicaciones = false;
    this.aplicacionesExternasService.getAppExterna().subscribe(
      (info) => {
        if (info) {
          this.list_aplicaciones = info.result;
          if (this.list_aplicaciones.length == 0) {
            this.sin_aplicaciones = true;
          }
        } else {
          this.sin_aplicaciones = true;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openDetalle(app: ListAppExternas) {
    this.detalle_app_externa = app;
    this.agregarAppExterna = true;
    this.actualizacion = true;
  }

  ngOnInit(): void {}

  constructor(
    private aplicacionesExternasService: AplicacionesExternasService
  ) {}
}
