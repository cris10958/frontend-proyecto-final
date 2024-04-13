import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListProductosServiciosComponent } from './list-productos-servicios.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListasService } from './listas.service';

@Component({
  selector: 'app-registro-socio',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule],
  template: `
    <div class="fd-color primary_container h-total w-100 row justify-content-center pb-5">
    <div class="col-7 fd-color p-4 shadow rounded pt-5 mt-5">
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
          <h1>Registro de socios</h1>
        </div>
        <div class="row pt-3 justify-content-center pt-5 pb-5">
          <div class="col-9">
            <form class="row g-3" [formGroup]="socio" (ngSubmit)="registro()">
              <div class="col-md-12">
                <label for="id-name-socio" class="form-label">Nombre</label>
                <input type="text" class="form-control fd-color white" id="id-name-socio" formControlName="nombre" [class]="{'is-invalid': socio.get('nombre')?.invalid && (socio.get('nombre')?.dirty || socio.get('nombre')?.touched)}" required>
                <div class="invalid-feedback">
                  Por favor registre su nombre para continuar
                </div>
              </div>
              <div class="col-md-6 pe-2">
                <label for="id-tp-doc-socio" class="form-label">Tipo  de documento</label>
                <select id="id-tp-doc-socio"  class="form-select fd-color white" formControlName="tipo_documento" [class]="{'is-invalid': (socio.get('tipo_documento')?.invalid || socio.value.tipo_documento == '0') && (socio.get('tipo_documento')?.dirty || socio.get('tipo_documento')?.touched)}"  required>
                  <option value="0" disabled>Seleccione uno</option>
                  <option *ngFor="let tipo of listaDocumentoService.listaTipoDocumento" [value]="tipo.key">{{tipo.value}}</option>
                </select>
                <div class="invalid-feedback">
                  Por favor seleccione el tipo de documento de identificación
                </div>
              </div>
              <div class="col-md-6 ps-2">
                <label for="id-num-doc-socio" class="form-label">Número de documento</label>
                <input type="text" class="form-control fd-color white" id="id-num-doc-socio" formControlName="numero_documento" formControlName="numero_documento" [class]="{'is-invalid': socio.get('numero_documento')?.invalid && (socio.get('numero_documento')?.dirty || socio.get('numero_documento')?.touched)}" required>
                <div class="invalid-feedback">
                  Por favor ingrese su número de identificación
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-email-socio" class="form-label">Correo electrónico</label>
                <input type="email" class="form-control fd-color white" (input)="validarEmail()" id="id-email-socio" formControlName="email" [email]="true" [class]="{'is-invalid': (socio.get('email')?.invalid || !emailValid) && (socio.get('email')?.dirty || socio.get('email')?.touched)}"  id="id-email-usuario" formControlName="email" required>
                <div class="invalid-feedback">
                  Por favor ingrese su correo electrónico
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-password-socio" class="form-label">Contraseña</label>
                <input type="password" class="form-control fd-color white" id="id-password-socio" formControlName="password" [class]="{'is-invalid': socio.get('password')?.invalid && (socio.get('password')?.dirty || socio.get('password')?.touched)}" required>
                <div class="invalid-feedback">
                  Por favor ingrese una contraseña con la que ingresara al sistema
                </div>
              </div>
              <div class="row pt-5 p-0"> 
                <div class="col-md-6 text-end pe-0">
                  <button class="btn btn-secondary" routerLink="/home" type="submit">Cancelar</button>
                </div>
                <div class="col-md-6 text-start ps-4">
                  <button class="btn btn-primary" routerLink="/list-productos-servicios" type="submit" [disabled]="!socio.valid || !emailValid" >Registrar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    
  `]
})
export class RegistroSocioComponent {
  emailValid: boolean = false;

  socio = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    tipo_documento: new FormControl('0',Validators.required),
    numero_documento: new FormControl('',[Validators.required]),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  registro(){
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

  constructor(readonly listaDocumentoService: ListasService){}
}
