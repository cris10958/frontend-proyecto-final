import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-socios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="row justify-content-center p-5 mt-5">
      <div class="col-4 fd-color primary_container p-4 shadow rounded">
        <div class="row-col-12 text-start">
        <a href="/home">
          <img src="./assets/icon/Brand.png" class="ico-brand-w" alt="logo">
        </a>
        </div>
        <div class="row-col-12 text-start pt-3">
          <a href="">
            <img src="./assets/icon/ascesibilidad.png"  class="ico-ascesibilidad-w" alt="icono-accesibilidad">
          </a>
        </div>
        <div class="row-col-12 text-center pt-3">
          <h1>Ingreso de socios</h1>
        </div>
        <div class="row pt-3 justify-content-center pt-5 pb-5">
          <div class="col-9">
            <form class="row g-3" [formGroup]="socio" (ngSubmit)="saveSocio()">
              <div class="col-md-12">
                <label for="id-email-socio" class="form-label">Correo Electrónico</label>
                <input type="email" class="form-control" id="id-email-socio" (input)="validarEmail()" formControlName="email" [class]="{'is-invalid': (socio.get('email')?.invalid || !emailValid) && (socio.get('email')?.dirty || socio.get('email')?.touched)}" [email]="true" required>
                <div class="invalid-feedback">
                  Por favor registre el correo electrónico para continuar
                </div>
              </div>
              <div class="col-md-12 pt-2">
                <label for="id-password-socio" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="id-password-socio" formControlName="contrasenia" [class]="{'is-invalid': socio.get('contrasenia')?.invalid && (socio.get('contrasenia')?.dirty || socio.get('contrasenia')?.touched) }" required>
                <div class="invalid-feedback">
                  Por favor ingrese la contraseña suministrada en el registro
                </div>
              </div>
              <div class="col-md-12">
                <a href="/registro-socios">Registrarme como socio</a>
              </div>
              <div class="col-12 text-center">
                <button class="btn btn-primary w-100" type="submit" [disabled]="!socio.valid && emailValid">Iniciar Sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>     
    </div>
  `,
  styles: ``
})
export class LoginSociosComponent {
  emailValid: boolean = false;

  socio = new FormGroup({
    email: new FormControl ('',[Validators .required]),
    contrasenia: new FormControl('',[Validators.required, Validators.minLength(8)])
  });

  saveSocio(){
    console.warn(this.socio.value)
  }
  validarEmail():void {
    this.emailValid = false;
      'use strict';

      var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (this.socio.value.email?.match(EMAIL_REGEX)){
        this.emailValid = true;
      }
  }  

}
