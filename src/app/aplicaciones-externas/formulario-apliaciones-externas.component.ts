import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { AplicacionesExternasComponent } from './aplicaciones-externas.component';
import {
  AplicacionesExternasService,
  ListAppExternas,
  RegistroApp,
} from './aplicaciones-externas.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-apliaciones-externas',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  template: `
    <div class="row justify-content-center">
      <div
        class="col-12 col-sm-12 col-md-10 col-lg-5 col-xl-5 col-xxl-5 col-xxxl-5 fd-color p-4 shadow rounded contenedor-form"
      >
        <form [formGroup]="registro_app_externa">
          <div class="row-col-12 text-center">
            <h1>Registrar servicio externo</h1>
          </div>
          <div class="row-col-12 pt-4">
            <label for="id-input-nombre-app-ext" class="form-label"
              >Nombre del servicio</label
            >
            <input
              id="id-input-nombre-app-ext"
              class="form-control fd-color white"
              type="text"
              formControlName="nombre"
              [class]="{
                'is-invalid':
                  registro_app_externa.get('nombre')?.invalid &&
                  (registro_app_externa.get('nombre')?.dirty ||
                    registro_app_externa.get('nombre')?.touched)
              }"
              required
            />
            <div class="invalid-feedback">
              Por favor registre el nombre del servicio
            </div>
          </div>
          <div class="row-col-12 pt-2">
            <label for="id-textare-desc-app-ext" class="form-label"
              >Descripción</label
            >
            <div class="form-floating">
              <textarea
                formControlName="descripcion"
                placeholder="Descripción aplicación externa"
                class="form-control fd-color white"
                id="id-textare-desc-app-ext"
                [class]="{
                  'is-invalid':
                    registro_app_externa.get('descripcion')?.invalid &&
                    (registro_app_externa.get('descripcion')?.dirty ||
                      registro_app_externa.get('descripcion')?.touched)
                }"
                required
              ></textarea>
              <label
                for="id-textare-desc-app-ext"
                class="color-letra-gray-600 small"
                >Descripción de la aplicación externa</label
              >
              <div class="invalid-feedback">
                Por favor ingrese una descripción de la aplicación externa de no
                más de 500 caracteres
              </div>
            </div>
          </div>
          <div class="row-col-12 pt-2">
            <label for="id-wbh" class="form-label">Webhook</label>
            <input
              id="id-wbh"
              type="text"
              class="form-control fd-color white"
              formControlName="webhook"
              [class]="{
                'is-invalid':
                  registro_app_externa.get('webhook')?.invalid &&
                  (registro_app_externa.get('webhook')?.dirty ||
                    registro_app_externa.get('webhook')?.touched)
              }"
              required
            />
            <div class="invalid-feedback">
              Por favor registre la url a la que se debe enviar la información
              de las sesiones deportivas
            </div>
          </div>
          <div class="tooltip-custom">
            <div class="row-col-12 pt-2">
              <label for="id-token" class="form-label">Token</label>
              <div class="input-group">
                <input
                  id="id-token"
                  type="password"
                  class="form-control fd-color white"
                  formControlName="token"
                  [class]="{
                    'is-invalid':
                      registro_app_externa.get('token')?.invalid &&
                      (registro_app_externa.get('token')?.dirty ||
                        registro_app_externa.get('token')?.touched)
                  }"
                  required
                />
                <span class="input-group-text fd-color white" id="cppiar">
                  <img
                    src="../../assets/icon/copy.png"
                    (click)="copiarAlPortapapeles('id-token')"
                    style="cursor: pointer;"
                    alt="copiar"
                  />
                </span>
                <div class="invalid-feedback">
                  Por favor ingrese el token de seguridad del webhook
                </div>
              </div>
            </div>
            <span class="tooltiptext-custom" [class]="{ open: open_tooltip }">{{
              msg_tooltip
            }}</span>
          </div>
          <div class="row-col-12 text-center pt-3">
            <div class="col-12 pb-2 text-center">
              <div class="invalido" *ngIf="isError">
                {{ error }}
              </div>
            </div>
            <div class="row p-0">
              <div class="col-6 text-end pe-0" *ngIf="!actualizacion">
                <button
                  class="btn btn-secondary"
                  (click)="cerrar()"
                  type="submit"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-12 text-center pe-0" *ngIf="actualizacion">
                <button
                  class="btn btn-secondary"
                  (click)="cerrar()"
                  type="submit"
                >
                  Cerrar
                </button>
              </div>
              <div class="col-6 text-start ps-4"  *ngIf="!actualizacion">
                <button
                  type="submit"
                  class="btn btn-primary"
                  (click)="guardar()"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      /* Contenedor del tooltip */
      .tooltip-custom {
        position: relative;
      }

      /* Texto del tooltip */
      .tooltip-custom .tooltiptext-custom {
        visibility: hidden;
        width: 120px;
        background-color: #21005d;
        color: #eaddff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        /* Posiciona el texto del tooltip */
        position: absolute;
        z-index: 1;
        bottom: 60%;
        left: 90%;
        margin-left: -60px;
        /* Efecto de aparición del tooltip */
        opacity: 0;
        transition: opacity 0.3s;
      }

      /* Flecha del tooltip */
      .tooltip-custom .tooltiptext-custom::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #21005d transparent transparent transparent;
      }

      /* Muestra el texto del tooltip al pasar el cursor sobre el contenedor */
      .open {
        visibility: visible !important;
        opacity: 1 !important;
      }
    `,
  ],
})
export class FormularioApliacionesExternasComponent implements OnInit {
  open_tooltip: boolean = false;
  msg_tooltip: string = '';
  isError: boolean = false;
  error: string = '';

  @Output() cerrarRegistro = new EventEmitter<string>();
  @Input() detalle_app !: ListAppExternas; 
  @Input() actualizacion : boolean = false; 


  cerrar() {
    this.cerrarRegistro.emit('');
  }

  registro_app_externa = new FormGroup({
    nombre: new FormControl('', [
      Validators.maxLength(50),
      Validators.required,
    ]),
    descripcion: new FormControl('', [
      Validators.maxLength(500),
      Validators.required,
    ]),
    webhook: new FormControl('', [
      Validators.maxLength(500),
      Validators.required,
    ]),
    token: new FormControl('', [
      Validators.maxLength(100),
      Validators.required,
    ]),
  });

  guardar() {
    this.isError = false;
    this.error = '';

    if (this.registro_app_externa.valid) {
      const app_nueva: RegistroApp = {
        nombre: this.registro_app_externa.value.nombre ?? '',
        descripcion: this.registro_app_externa.value.descripcion ?? '',
        webhook: this.registro_app_externa.value.webhook ?? '',
        token: this.registro_app_externa.value.token ?? '',
      };

      this.aplicacionesExternasService.addAppExterna(app_nueva).subscribe(
        (resp) => {
          this.toastr.success(
            "Registro exitoso', 'Cada vez más cerca de tus metas"
          );
          this.cerrar();
        },
        (err) => {
          this.isError = true;
          this.error = err.message;
        }
      );
    } else {
      this.isError = true;
      this.error = 'Por favor ingrese la información solicitada';
    }
  }

  copiarAlPortapapeles(id_elemento: string) {
    try {
      const contenido = this.document.getElementById(
        id_elemento
      ) as HTMLInputElement;

      if (contenido) {
        const contenido_value = contenido.value;
        navigator.clipboard.writeText(contenido_value);
        this.msg_tooltip = '¡Copiado!';

        if (contenido_value == '') {
          this.msg_tooltip = '¡Sin contenido!';
        }
      } else {
        this.msg_tooltip = '¡Sin contenido!';
      }

      this.open_tooltip = true;

      setTimeout(() => {
        this.open_tooltip = false;
      }, 1000);
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  }

  ngOnInit(): void {
    this.registro_app_externa = new FormGroup({
      nombre: new FormControl(this.detalle_app.nombre, [
        Validators.maxLength(50),
        Validators.required,
      ]),
      descripcion: new FormControl(this.detalle_app.descripcion, [
        Validators.maxLength(500),
        Validators.required,
      ]),
      webhook: new FormControl(this.detalle_app.webhook, [
        Validators.maxLength(500),
        Validators.required,
      ]),
      token: new FormControl(this.detalle_app.token, [
        Validators.maxLength(100),
        Validators.required,
      ]),
    });

    if(this.actualizacion){
      this.registro_app_externa.disable();
    }

  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private aplicacionesExternasService: AplicacionesExternasService,
    private toastr: ToastrService
  ) {}
}
