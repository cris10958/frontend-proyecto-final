import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListasService } from './listas.service';
import { LoginSocio, SocioRegistro, SociosService } from './socios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-socio',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div
      class="fd-color primary_container h-total w-100 row justify-content-center pb-5"
    >
      <div class="col-7 fd-color p-4 shadow rounded pt-5 mt-5">
        <div class="row-col-12 text-start">
          <a href="/home">
            <img src="./assets/icon/Brand.png" class="ico-brand-w" alt="logo" />
          </a>
        </div>
        <div class="row-col-12 text-start pt-3">
          <a href="">
            <img
              id="img-acc"
              src="./assets/icon/ascesibilidad.png"
              class="ico-ascesibilidad-w"
              alt="icono-accesibilidad"
            />
          </a>
        </div>
        <div class="row-col-12 text-center pt-3">
          <h1>Registro de socios</h1>
        </div>
        <div class="row pt-3 justify-content-center pt-5 pb-5">
          <div class="col-9">
            <form class="row g-3" [formGroup]="socio" (ngSubmit)="registro()">
              <div class="col-md-12">
                <label for="id-name-socio" class="form-label">Nombre</label>
                <input
                  type="text"
                  class="form-control fd-color white"
                  id="id-name-socio"
                  formControlName="nombre"
                  [class]="{
                    'is-invalid':
                      socio.get('nombre')?.invalid &&
                      (socio.get('nombre')?.dirty ||
                        socio.get('nombre')?.touched)
                  }"
                  required
                />
                <div class="invalid-feedback">
                  Por favor registre su nombre para continuar
                </div>
              </div>
              <div class="col-md-6 pe-2">
                <label
                  id="id-lb-tp-doc-socio"
                  for="id-tp-doc-socio"
                  class="form-label"
                  >Tipo de documento</label
                >
                <select
                  id="id-tp-doc-socio"
                  class="form-select fd-color white"
                  formControlName="tipo_identificacion"
                  [class]="{
                    'is-invalid':
                      (socio.get('tipo_identificacion')?.invalid ||
                        socio.value.tipo_identificacion == '0') &&
                      (socio.get('tipo_identificacion')?.dirty ||
                        socio.get('tipo_identificacion')?.touched)
                  }"
                  required
                >
                  <option value="0" disabled>Seleccione uno</option>
                  <option
                    *ngFor="
                      let tipo of listaDocumentoService.listaTipoDocumento
                    "
                    [value]="tipo.key"
                  >
                    {{ tipo.value }}
                  </option>
                </select>
                <div class="invalid-feedback">
                  Por favor seleccione el tipo de documento de identificación
                </div>
              </div>
              <div class="col-md-6 ps-2">
                <label
                  id="id-lb-num-doc-socio"
                  for="id-num-doc-socio"
                  class="form-label"
                  >Número de documento</label
                >
                <input
                  type="text"
                  class="form-control fd-color white"
                  id="id-num-doc-socio"
                  formControlName="numero_identificacion"
                  formControlName="numero_identificacion"
                  [class]="{
                    'is-invalid':
                      socio.get('numero_identificacion')?.invalid &&
                      (socio.get('numero_identificacion')?.dirty ||
                        socio.get('numero_identificacion')?.touched)
                  }"
                  required
                />
                <div class="invalid-feedback">
                  Por favor ingrese su número de identificación
                </div>
              </div>
              <div class="col-md-6">
                <label
                  id="id-lb-email-socio"
                  for="id-email-socio"
                  class="form-label"
                  >Correo electrónico</label
                >
                <input
                  type="email"
                  id="id-email-socio"
                  class="form-control fd-color white"
                  (input)="validarEmail()"
                  formControlName="email"
                  [email]="true"
                  [class]="{
                    'is-invalid':
                      (socio.get('email')?.invalid || !emailValid) &&
                      (socio.get('email')?.dirty || socio.get('email')?.touched)
                  }"
                  formControlName="email"
                  required
                />
                <div class="invalid-feedback">
                  Por favor ingrese su correo electrónico
                </div>
              </div>
              <div class="col-md-6">
                <label
                  id="id-lb-contrasena-socio"
                  for="id-contrasena-socio"
                  class="form-label"
                  >Contraseña</label
                >
                <input
                  type="password"
                  class="form-control fd-color white"
                  id="id-contrasena-socio"
                  formControlName="contrasena"
                  [class]="{
                    'is-invalid':
                      socio.get('contrasena')?.invalid &&
                      (socio.get('contrasena')?.dirty ||
                        socio.get('contrasena')?.touched)
                  }"
                  required
                />
                <div class="invalid-feedback">
                  Por favor ingrese una contraseña con la que ingresara al
                  sistema
                </div>
              </div>
              <div class="col-md-12 pt-5 pb-2 text-center">
                <div class="invalido" *ngIf="isError">
                  {{ error }}
                </div>
              </div>
              <div class="row  p-0">
                <div class="col-md-6 text-end pe-0">
                  <button
                    class="btn btn-secondary"
                    routerLink="/home"
                    type="submit"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 text-start ps-4">
                  <button
                    id="id-bt"
                    class="btn btn-primary"
                    type="submit"
                    [disabled]="!socio.valid || !emailValid"
                  >
                    Registrar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class RegistroSocioComponent {
  emailValid: boolean = false;
  isError: boolean = false;
  error: string = '';

  socio = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    tipo_identificacion: new FormControl('0', Validators.required),
    numero_identificacion: new FormControl('', [Validators.required]),
    email: new FormControl('', Validators.required),
    contrasena: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  registro() {
    if (this.socio.valid && this.emailValid) {
      const socioRegistro: SocioRegistro = this.socio.value;
      socioRegistro.contrasena = btoa(this.socio.value.contrasena!);
      this.socioService.addSocio(socioRegistro).subscribe(
        (resp) => {
          if (resp.token == '') {
            this.router.navigate(['/login-socios']);
            return;
          }
          if (socioRegistro.email != null && socioRegistro.contrasena != null) {
            this.login(socioRegistro.email, socioRegistro.contrasena);
          }
          else{
            this.router.navigate(['/login-socios']);
            return;
          }
        },
        (err) => {
          this.isError = true;
          this.error = err.message;
        }
      );
    }
  }

  login(email: string, contrasena: string) {
    if (email != null && contrasena != null) {
      const loginSocio: LoginSocio = {
        email: email,
        contrasena: contrasena,
      };
      this.socioService.loginSocio(loginSocio).subscribe(
        (resp) => {
          if (resp.token == '') {
            this.router.navigate(['/login-socios']);
            return;
          }
          this.socioService.registrarToken(resp.token);
          this.router.navigate(['/list-productos-servicios']);
        },
        (err) => {
          this.isError = true;
          this.error = err.message;
        }
      );
    } else {
      this.router.navigate(['/login-socios']);
      return;
    }
  }

  validarEmail(): void {
    this.emailValid = false;
    ('use strict');

    var EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.socio.value.email?.match(EMAIL_REGEX)) {
      this.emailValid = true;
    }
  }

  constructor(
    readonly listaDocumentoService: ListasService,
    private socioService: SociosService,
    private router: Router
  ) {}
}
