import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListasService } from './listas.service';

@Component({
  selector: 'app-registro-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
     <div class="fd-color h-total w-100 row justify-content-center pb-5">
    <div class="col-8 fd-color white p-4 shadow rounded pt-5 mt-5">
        <div class="row pt-3 justify-content-center pt-2 pb-5">
          <div class="col-10">
            <div class="row-col-12 text-start">
              <a href="/home">
                <img src="./assets/icon/Brand.png" class="ico-brand-w" alt="logo">
              </a>
            </div>
            <div class="row-col-12 text-center pt-3 pb-3">
              <h1>Registro Inicial</h1>
            </div>
            <form class="row g-3" [formGroup]="usuario" (ngSubmit)="registro()">
              <div class="col-md-6">
                <label for="id-name-usuario" class="form-label">Nombre</label>
                <input type="text" class="form-control fd-color white" id="id-name-usuario" formControlName="nombre" [class]="{'is-invalid': usuario.get('nombre')?.invalid && (usuario.get('nombre')?.dirty || usuario.get('nombre')?.touched)}"  id="id-nombre-usuario" required>
                <div class="invalid-feedback">
                  Por favor registre su nombre para continuar
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-name-apellido" class="form-label">Apellido</label>
                <input type="text" class="form-control fd-color white" id="id-name-apellido" formControlName="apellido" [class]="{'is-invalid': usuario.get('apellido')?.invalid && (usuario.get('apellido')?.dirty || usuario.get('apellido')?.touched)}"  required>
                <div class="invalid-feedback">
                  Por favor registre su apellido para continuar
                </div>
              </div>
              <div class="col-md-6 pe-2">
                <label for="id-tp-doc-usuario" class="form-label">Tipo de identificación</label>
                <select id="id-tp-doc-usuario"  class="form-select fd-color white" formControlName="tipo_identificacion" [class]="{'is-invalid': (usuario.get('tipo_identificacion')?.invalid || usuario.value.tipo_identificacion == '0') && (usuario.get('tipo_identificacion')?.dirty || usuario.get('tipo_identificacion')?.touched)}"  required>
                  <option value="0" disabled>Seleccione uno</option>
                  <option *ngFor="let tipo of listaDocumentoService.listaTipoDocumento" [value]="tipo.key">{{tipo.value}}</option>
                </select>
                <div class="invalid-feedback">
                  Por favor seleccione su tipo de identificación
                </div>
              </div>
              <div class="col-md-6 ps-2">
                <label for="id-num-doc-usuario" class="form-label">Número de identificación</label>
                <input type="number" class="form-control fd-color white" id="id-num-doc-usuario" formControlName="numero_idenficacion" [class]="{'is-invalid': usuario.get('numero_idenficacion')?.invalid && (usuario.get('numero_idenficacion')?.dirty || usuario.get('numero_idenficacion')?.touched)}" required>
                <div class="invalid-feedback">
                  Por favor ingrese su número de identificación
                </div>
              </div>
              <div class="col-md-6 ps-2">
                <label for="id-genero-usuario" class="form-label">Genero</label>
                <div class="row-col-12">
                  <div class="form-check form-check-inline" *ngFor="let genero of listaDocumentoService.listaGenero">
                    <input class="form-check-input" (click)="usuario.value.genero = genero.key; generoValid = true;" type="radio" name="inlineGenero" [value]="genero.key">
                    <label class="form-check-label" for="inlineRadio1">{{genero.value}}</label>
                  </div>
                  <div class="invalido" *ngIf="!generoValid">
                    Por favor seleccione su genero
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-edad-usuario" class="form-label">Edad</label>
                <input type="number" class="form-control fd-color white" id="id-edad-usuario"  formControlName="edad" [class]="{'is-invalid': (usuario.get('edad')?.invalid || usuario.value.edad == '0') && (usuario.get('edad')?.dirty || usuario.get('edad')?.touched)}" required>
                <div class="invalid-feedback">
                  Por favor ingrese su edad
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-peso-usuario" class="form-label">Peso</label>
                <input type="number" class="form-control fd-color white" id="id-peso-usuario" placeholder="Peso en kilogramos (kg)" formControlName="peso" [class]="{'is-invalid': (usuario.get('peso')?.invalid || usuario.value.peso == '0') && (usuario.get('peso')?.dirty || usuario.get('peso')?.touched)}" required>
                <div class="invalid-feedback">
                  Por favor ingrese su peso
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-altura-usuario" class="form-label">Altura</label>
                <input type="number" class="form-control fd-color white" id="id-altura-usuario" formControlName="altura" [class]="{'is-invalid': (usuario.get('altura')?.invalid 
                || usuario.value.altura == '0') && (usuario.get('altura')?.dirty || usuario.get('altura')?.touched)}" placeholder="Altura en centimetros (cm)" required>
                <div class="invalid-feedback">
                  Por favor ingrese su altura
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-pais-usuario" class="form-label">País de nacimiento</label>
                <select id="id-pais-usuario" class="form-select fd-color white" formControlName="pais_nacimiento" [class]="{'is-invalid': (usuario.get('pais_nacimiento')?.invalid || usuario.value.pais_nacimiento == '0') && (usuario.get('pais_nacimiento')?.dirty || usuario.get('pais_nacimiento')?.touched)}">
                  <option value="0" disabled>Seleccione uno</option>
                  <option [value]="pais.key" *ngFor="let pais of listaDocumentoService.listaPais">{{pais.value}}</option>
                </select>
                <div class="invalid-feedback">
                  Por favor seleccione su país de nacimiento
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-ciudad-usuario" class="form-label">Ciudad de nacimiento</label>
                <select id="id-ciudad-usuario" class="form-select fd-color white"  formControlName="ciudad_nacimiento" [class]="{'is-invalid': (usuario.get('ciudad_nacimiento')?.invalid || usuario.value.ciudad_nacimiento == '0') && (usuario.get('ciudad_nacimiento')?.dirty || usuario.get('ciudad_nacimiento')?.touched)}" >
                  <option value="0" disabled>Seleccione uno</option>
                  <option [value]="ciudad.key" *ngFor="let ciudad of listaDocumentoService.listaCiudad">{{ciudad.value}}</option>
                </select>
                <div class="invalid-feedback">
                  Por favor seleccione su ciudad de nacimiento
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-pais-residencia-usuario" class="form-label">País de residencia</label>
                <select id="id-pais-residencia-usuario" class="form-select fd-color white" formControlName="pais_residencia" [class]="{'is-invalid': (usuario.get('pais_residencia')?.invalid || usuario.value.pais_residencia == '0') && (usuario.get('pais_residencia')?.dirty || usuario.get('pais_residencia')?.touched)}" required>
                  <option value="0" disabled>Seleccione uno</option>
                  <option [value]="pais.key" *ngFor="let pais of listaDocumentoService.listaPais">{{pais.value}}</option>
                </select>
                <div class="invalid-feedback">
                  Por favor seleccione su país de residencia
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-ciudad-residencia-usuario" class="form-label">Ciudad de residencia</label>
                <select id="id-ciudad-residencia-usuario" class="form-select fd-color white" formControlName="ciudad_residencia" [class]="{'is-invalid': (usuario.get('ciudad_residencia')?.invalid || usuario.value.ciudad_residencia == '0' ) && (usuario.get('ciudad_residencia')?.dirty || usuario.get('ciudad_residencia')?.touched)}" required>
                  <option value="0" disabled>Seleccione uno</option>
                  <option [value]="ciudad.key"  *ngFor="let ciudad of listaDocumentoService.listaCiudad">{{ciudad.value}}</option>
                </select>
                <div class="invalid-feedback">
                  Por favor seleccione su ciudad de residencia
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-deporte-usuario" class="form-label">¿Cuál de los siguientes deportes practica o desea practicar?</label>
                <div id="id-deporte-usuario" class="form-check" >
                  <input class="form-check-input" type="checkbox" formControlName="atletismo" id="id-op-atletismo">
                  <label class="form-check-label" for="id-op-atletismo">
                    Atletismo
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" formControlName="ciclismo" id="id-op-ciclismo">
                  <label class="form-check-label" for="id-op-ciclismo">
                    Ciclismo
                  </label>
                </div>
                <div class="invalido" *ngIf="(usuario.value.atletismo == '' && usuario.value.ciclismo == '' ) && (usuario.get('atletismo')?.dirty || usuario.get('atletismo')?.touched || usuario.get('ciclismo')?.dirty || usuario.get('ciclismo')?.touched)">
                  Por favor seleccione el deporte que practica o desea practicar
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-tiempo-residencia-usuario" class="form-label">¿Hace cuánto tiempo reside en esta ciudad?</label>
                <input type="number" class="form-control fd-color white" id="id-tiempo-residencia-usuario" placeholder="Tiempo en meses" formControlName="tiempo_residencia" [class]="{'is-invalid': usuario.get('tiempo_residencia')?.invalid && (usuario.get('tiempo_residencia')?.dirty || usuario.get('tiempo_residencia')?.touched)}" required>
                <div class="invalid-feedback">
                  Por favor ingrese el tiempo de residencia en la ciudad ingresada anterioremente
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-email-usuario" class="form-label">Correo electrónico</label>
                <input type="text" class="form-control fd-color white" (input)="validarEmail()" id="id-email-usuario" [class]="{'is-invalid': (usuario.get('email')?.invalid || !emailValid) && (usuario.get('email')?.dirty || usuario.get('email')?.touched)}"  id="id-email-usuario" formControlName="email" [email]="true" required>
                <div class="invalid-feedback">
                  Por favor ingrese su correo electrónico
                </div>
              </div>
              <div class="col-md-6">
                <label for="id-password-usuario" class="form-label">Contraseña</label>
                <input type="password" class="form-control fd-color white" id="id-password-usuario" formControlName="contrasenia" [class]="{'is-invalid': usuario.get('contrasenia')?.invalid && (usuario.get('contrasenia')?.dirty || usuario.get('contrasenia')?.touched)}" required>
                <div class="invalid-feedback">
                  Por favor ingrese una contraseña con la que ingresara al sistema
                </div>
              </div>
              <div class="row pt-5 p-0"> 
                <div class="col-md-6 text-end pe-0">
                  <button class="btn btn-secondary" routerLink="/home" type="submit">Cancelar</button>
                </div>
                <div class="col-md-6 text-start ps-4">
                  <button class="btn btn-primary" routerLink="/planes-subscripcion" type="submit" [disabled]="!usuario.valid || !emailValid || usuario.value.tipo_identificacion == '0' || usuario.value.pais_nacimiento == '0' || usuario.value.ciudad_nacimiento == '0' || usuario.value.pais_residencia == '0' || usuario.value.ciudad_residencia == '0' || usuario.value.altura == '0' || usuario.value.peso == '0' || usuario.value.tiempo_residencia == '0'" >Registrar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class RegistroUsuariosComponent {
  emailValid: boolean = false;
  deporteValid: boolean = false;
  generoValid: boolean = true;
  


  usuario = new FormGroup({
    nombre: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    apellido: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    tipo_identificacion: new FormControl('0',[Validators.required]),
    numero_idenficacion: new FormControl('',[Validators.required, Validators.maxLength(15)]),
    genero: new FormControl(''),
    edad: new FormControl('',[Validators.required, Validators.max(999)]),
    peso: new FormControl('',[Validators.required, Validators.max(999)]),
    altura: new FormControl('',[Validators.required, Validators.max(999)]),
    pais_nacimiento: new FormControl('0',[Validators.required]),
    ciudad_nacimiento: new FormControl('0',[Validators.required]),
    pais_residencia: new FormControl('0',[Validators.required]),
    ciudad_residencia: new FormControl('0',[Validators.required]),
    deporte_practica: new FormControl('',[Validators.required]),
    tiempo_residencia: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    contrasenia: new FormControl('',[Validators.required, Validators.minLength(8)]),
    atletismo: new FormControl(''),
    ciclismo: new FormControl(''),
  });

  

  registro(){
    if(this.usuario.value.genero == ''){
      this.generoValid = false;
      return
    }
    console.warn(this.usuario.value)
  }
  validarEmail():void {
    this.emailValid = false;
      'use strict';

      var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (this.usuario.value.email?.match(EMAIL_REGEX)){
        this.emailValid = true;
      }
  }

  constructor(readonly listaDocumentoService: ListasService){}

 
}
