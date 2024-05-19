import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginUsuario, UsuarioService } from './usuario.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="row justify-content-center p-5 mt-5">
      <div class="col-4 fd-color p-4 shadow rounded">
        <div class="row pt-3 justify-content-center pt-5 pb-5">
          <div class="col-9">
            <div class="row-col-9 text-start pb-5">
              <a href="/home">
                <img
                  src="./assets/icon/Brand.png"
                  class="ico-brand-w"
                  alt="logo"
                />
              </a>
            </div>
            <form class="row g-3" [formGroup]="usuario" (ngSubmit)="login()">
              <div class="col-md-12">
                <label for="id-email-usuario" class="form-label"
                  >Correo Electrónico</label
                >
                <input
                  type="email"
                  class="form-control"
                  (input)="validarEmail()"
                  [class]="{
                    'is-invalid':
                      (usuario.get('email')?.invalid || !emailValid) &&
                      (usuario.get('email')?.dirty ||
                        usuario.get('email')?.touched)
                  }"
                  id="id-email-usuario"
                  formControlName="email"
                  [email]="true"
                  required
                />
                <div class="invalid-feedback">
                  Por favor registre el correo electrónico para continuar
                </div>
              </div>
              <div class="col-md-12 pt-2">
                <label for="id-password-usuario" class="form-label"
                  >Contraseña</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="id-password-usuario"
                  formControlName="contrasena"
                  [class]="{
                    'is-invalid':
                      usuario.get('contrasena')?.invalid &&
                      (usuario.get('contrasena')?.dirty ||
                        usuario.get('contrasena')?.touched)
                  }"
                  required
                />
                <div class="invalid-feedback">
                  Por favor ingrese la contraseña suministrada en el registro
                </div>
              </div>
              <div class="col-md-12">
                <a href="/registro-usuarios">Registrarme</a>
              </div>
              <div class="col-md-12 pt-2">
                <div class="invalido" *ngIf="isError">
                  {{ error }}
                </div>
              </div>
              <div class="col-12 text-center">
                <button
                  id="btn-iniciar-sesion"
                  class="btn btn-primary w-100"
                  [disabled]="!usuario.valid || !emailValid"
                  routerLink="/home-usuario"
                  type="submit"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class LoginUsuariosComponent implements OnInit {
  emailValid: boolean = false;
  isError: boolean = false;
  error: string = '';
  helper = new JwtHelperService();

  usuario = new FormGroup({
    email: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  login() {
    if (this.usuario.valid && this.emailValid) {
      const loginUsuario: LoginUsuario = this.usuario.value;
      loginUsuario.contrasena = btoa(this.usuario.value.contrasena!);
      this.loginUsuarioServie.loginUsuarios(loginUsuario).subscribe(
        (resp) => {
          this.clearForm(loginUsuario.email!, undefined);
          this.loginUsuarioServie.registrarToken(resp.token);
          this.router.navigate(['/home-usuario']);
          this.toastr.success('Que gusto verte de regreso', 'Bienvenido');
        },
        (err) => {
          this.isError = true;
          this.error = err.message;
          this.clearForm(loginUsuario.email!, undefined);
        }
      );
    }
  }
  validarEmail(): void {
    this.emailValid = false;
    ('use strict');

    var EMAIL_REGEX =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.usuario.value.email?.match(EMAIL_REGEX)) {
      this.emailValid = true;
    }
  }
  clearForm(
    emailPers: string | undefined,
    contrasena: string | undefined
  ): void {
    if (emailPers) {
      this.usuario.setValue({
        email: emailPers!,
        contrasena: '',
      });
      return;
    }
    this.usuario.reset();
  }
  constructor(
    private loginUsuarioServie: UsuarioService,
    private router: Router,
    private toastr: ToastrService
    
  ) {}
  ngOnInit() {
    this.usuario.reset();
  }
}
