import { Component, Input, OnInit } from '@angular/core';
import { Ciudad, ListasService } from './listas.service';
import {
  Deporte,
  LoginUsuario,
  Usuario,
  UsuarioService,
  UsuarioUpd,
} from './usuario.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { flip } from '@popperjs/core';
import { noop } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-registro-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <form class="row g-3" [formGroup]="usuario">
      <div class="col-6">
        <label for="id-nombre-usuario" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control fd-color white"
          id="id-nombre-usuario"
          formControlName="nombre"
          [class]="{
            'is-invalid':
              usuario.get('nombre')?.invalid &&
              (usuario.get('nombre')?.dirty || usuario.get('nombre')?.touched)
          }"
          id="id-nombre-usuario"
          required
        />
        <div class="invalid-feedback">
          Por favor registre su nombre para continuar
        </div>
      </div>
      <div class="col-6">
        <label id="id-label-apellido" for="id-apellido" class="form-label"
          >Apellido</label
        >
        <input
          type="text"
          class="form-control fd-color white"
          id="id-apellido"
          formControlName="apellido"
          [class]="{
            'is-invalid':
              usuario.get('apellido')?.invalid &&
              (usuario.get('apellido')?.dirty ||
                usuario.get('apellido')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">
          Por favor registre su apellido para continuar
        </div>
      </div>
      <div class="col-6 pe-2">
        <label id="id-label-tp-doc" for="id-tp-doc-usuario" class="form-label"
          >Tipo de identificación</label
        >
        <select
          id="id-tp-doc-usuario"
          class="form-select fd-color white"
          formControlName="tipo_identificacion"
          [class]="{
            'is-invalid':
              (usuario.get('tipo_identificacion')?.invalid ||
                usuario.value.tipo_identificacion == '0') &&
              (usuario.get('tipo_identificacion')?.dirty ||
                usuario.get('tipo_identificacion')?.touched)
          }"
          required
        >
          <option value="0" disabled>Seleccione uno</option>
          <option
            *ngFor="let tipo of listaDocumentoService.listaTipoDocumento"
            [value]="tipo.key"
          >
            {{ tipo.value }}
          </option>
        </select>
        <div class="invalid-feedback">
          Por favor seleccione su tipo de identificación
        </div>
      </div>
      <div class="col-6 ps-2">
        <label id="id-label-num-doc" for="id-num-doc-usuario" class="form-label"
          >Número de identificación</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-num-doc-usuario"
          formControlName="numero_identificacion"
          [class]="{
            'is-invalid':
              usuario.get('numero_identificacion')?.invalid &&
              (usuario.get('numero_identificacion')?.dirty ||
                usuario.get('numero_identificacion')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">
          Por favor ingrese su número de identificación
        </div>
      </div>
      <div class="col-6 ps-2">
        <label id="id-label-genero" for="id-genero-usuario" class="form-label"
          >Género</label
        >
        <div class="row-col-12">
          <div
            class="form-check form-check-inline"
            *ngFor="let genero of listaDocumentoService.listaGenero"
          >
            <input
              class="form-check-input"
              (click)="setGenero(genero.key)"
              type="radio"
              name="inlineGenero"
              [value]="genero.key"
              [checked]="genero.key == this.generoSelected"
            />
            <label class="form-check-label" for="inlineRadio1">{{
              genero.value
            }}</label>
          </div>
        </div>
      </div>
      <div class="col-6">
        <label id="id-label-edad" for="id-edad-usuario" class="form-label"
          >Edad</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-edad-usuario"
          formControlName="edad"
          [class]="{
            'is-invalid':
              (usuario.get('edad')?.invalid || usuario.value.edad == '0') &&
              (usuario.get('edad')?.dirty || usuario.get('edad')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">Por favor ingrese su edad</div>
      </div>
      <div class="col-6">
        <label for="id-peso-usuario" class="form-label">Peso</label>
        <input
          type="number"
          class="form-control fd-color white"
          id="id-peso-usuario"
          placeholder="Peso en kilogramos (kg)"
          formControlName="peso"
          [class]="{
            'is-invalid':
              (usuario.get('peso')?.invalid || usuario.value.peso == '0') &&
              (usuario.get('peso')?.dirty || usuario.get('peso')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">Por favor ingrese su peso</div>
      </div>
      <div class="col-6">
        <label id="id-label-altura" for="id-altura-usuario" class="form-label"
          >Altura</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-altura-usuario"
          formControlName="altura"
          [class]="{
            'is-invalid':
              (usuario.get('altura')?.invalid || usuario.value.altura == '0') &&
              (usuario.get('altura')?.dirty || usuario.get('altura')?.touched)
          }"
          placeholder="Altura en centimetros (cm)"
          required
        />
        <div class="invalid-feedback">Por favor ingrese su altura</div>
      </div>
      <div class="col-6">
        <label id="id-label-pais" for="id-pais-usuario" class="form-label"
          >País de nacimiento</label
        >
        <select
          id="id-pais-usuario"
          (change)="
            getCiudadNacimiento(); usuario.value.ciudad_nacimiento = '0'
          "
          class="form-select fd-color white"
          formControlName="pais_nacimiento"
          [class]="{
            'is-invalid':
              (usuario.get('pais_nacimiento')?.invalid ||
                usuario.value.pais_nacimiento == '0') &&
              (usuario.get('pais_nacimiento')?.dirty ||
                usuario.get('pais_nacimiento')?.touched)
          }"
        >
          <option value="0" disabled>Seleccione uno</option>
          <option
            [value]="pais.key"
            *ngFor="let pais of listaDocumentoService.listaPais"
          >
            {{ pais.value }}
          </option>
        </select>
        <div class="invalid-feedback">
          Por favor seleccione su país de nacimiento
        </div>
      </div>
      <div class="col-6">
        <label id="id-label-ciudad" for="id-ciudad-usuario" class="form-label"
          >Ciudad de nacimiento</label
        >
        <select
          id="id-ciudad-usuario"
          class="form-select fd-color white"
          formControlName="ciudad_nacimiento"
          [class]="{
            'is-invalid':
              (usuario.get('ciudad_nacimiento')?.invalid ||
                usuario.value.ciudad_nacimiento == '0') &&
              (usuario.get('ciudad_nacimiento')?.dirty ||
                usuario.get('ciudad_nacimiento')?.touched)
          }"
        >
          <option value="0" disabled>Seleccione uno</option>
          <option
            [value]="ciudad.key"
            *ngFor="let ciudad of listaCiudadNacimineto"
          >
            {{ ciudad.value }}
          </option>
        </select>
        <div class="invalid-feedback">
          Por favor seleccione su ciudad de nacimiento
        </div>
      </div>
      <div class="col-6">
        <label
          id="id-label-pais-residencia"
          for="id-pais-residencia-usuario"
          class="form-label"
          >País de residencia</label
        >
        <select
          id="id-pais-residencia-usuario"
          (change)="
            getCiudadResidencia(); usuario.value.ciudad_residencia = '0'
          "
          class="form-select fd-color white"
          formControlName="pais_residencia"
          [class]="{
            'is-invalid':
              (usuario.get('pais_residencia')?.invalid ||
                usuario.value.pais_residencia == '0') &&
              (usuario.get('pais_residencia')?.dirty ||
                usuario.get('pais_residencia')?.touched)
          }"
          required
        >
          <option value="0" disabled>Seleccione uno</option>
          <option
            [value]="pais.key"
            *ngFor="let pais of listaDocumentoService.listaPais"
          >
            {{ pais.value }}
          </option>
        </select>
        <div class="invalid-feedback">
          Por favor seleccione su país de residencia
        </div>
      </div>
      <div class="col-6">
        <label
          id="id-label-ciudad-residencia"
          for="id-ciudad-residencia-usuario"
          class="form-label"
          >Ciudad de residencia</label
        >
        <select
          id="id-ciudad-residencia-usuario"
          class="form-select fd-color white"
          formControlName="ciudad_residencia"
          [class]="{
            'is-invalid':
              (usuario.get('ciudad_residencia')?.invalid ||
                usuario.value.ciudad_residencia == '0') &&
              (usuario.get('ciudad_residencia')?.dirty ||
                usuario.get('ciudad_residencia')?.touched)
          }"
          required
        >
          <option value="0" disabled>Seleccione uno</option>
          <option
            [value]="ciudad.key"
            *ngFor="let ciudad of listaCiudadResidencia"
          >
            {{ ciudad.value }}
          </option>
        </select>
        <div class="invalid-feedback">
          Por favor seleccione su ciudad de residencia
        </div>
      </div>
      <div class="col-6">
        <label id="id-label-deporte" for="id-deporte-usuario" class="form-label"
          >¿Cuál de los siguientes deportes practica o desea practicar?</label
        >
        <div id="id-deporte-usuario" class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            formControlName="atletismo"
            id="id-op-atletismo"
            [checked]="usuario.value.atletismo == '1'"
          />
          <label class="form-check-label" for="id-op-atletismo">
            Atletismo
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            formControlName="ciclismo"
            id="id-op-ciclismo"
            [checked]="usuario.value.ciclismo == '1'"
          />
          <label class="form-check-label" for="id-op-ciclismo">
            Ciclismo
          </label>
        </div>
        <div
          class="invalido"
          *ngIf="
            usuario.value.atletismo == '' &&
            usuario.value.ciclismo == '' &&
            (usuario.get('atletismo')?.dirty ||
              usuario.get('atletismo')?.touched ||
              usuario.get('ciclismo')?.dirty ||
              usuario.get('ciclismo')?.touched)
          "
        >
          Por favor seleccione el deporte que practica o desea practicar
        </div>
      </div>
      <div class="col-6">
        <label
          id="id-label-tiempo-residencia"
          for="id-tiempo-residencia-usuario"
          class="form-label"
          >¿Hace cuánto tiempo reside en esta ciudad?</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-tiempo-residencia-usuario"
          placeholder="Tiempo en meses"
          formControlName="antiguedad_residencia"
          [class]="{
            'is-invalid':
              usuario.get('antiguedad_residencia')?.invalid &&
              (usuario.get('antiguedad_residencia')?.dirty ||
                usuario.get('antiguedad_residencia')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">
          Por favor ingrese el tiempo de residencia en la ciudad ingresada
          anterioremente
        </div>
      </div>
      <div class="col-12" *ngIf="!actualizacion">
        <label id="id-label-email" for="id-email-usuario" class="form-label"
          >Correo electrónico</label
        >
        <input
          type="text"
          class="form-control fd-color white"
          (input)="validarEmail()"
          id="id-email-usuario"
          [class]="{
            'is-invalid':
              (usuario.get('email')?.invalid || !emailValid) &&
              (usuario.get('email')?.dirty || usuario.get('email')?.touched)
          }"
          id="id-email-usuario"
          formControlName="email"
          [email]="true"
          required
        />
        <div class="invalid-feedback">
          Por favor ingrese su correo electrónico
        </div>
      </div>
      <div class="col-6" *ngIf="!actualizacion">
        <label
          id="id-label-password"
          for="id-password-usuario"
          class="form-label"
          >Contraseña</label
        >
        <input
          type="password"
          class="form-control fd-color white"
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
          Por favor ingrese una contraseña con la que ingresara al sistema
        </div>
      </div>
      <div class="col-6" *ngIf="!actualizacion">
        <label
          id="id-label-password-conf"
          for="id-password-conf-usuario"
          class="form-label"
          >Confirmar Contraseña</label
        >
        <input
          type="password"
          class="form-control fd-color white"
          id="id-password-conf-usuario"
          formControlName="confirmacion_contrasena"
          [class]="{
            'is-invalid':
              usuario.get('confirmacion_contrasena')?.invalid &&
              (usuario.get('confirmacion_contrasena')?.dirty ||
                usuario.get('confirmacion_contrasena')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">
          Por favor ingrese la confirmación de la contraseña ingresada en el campo anterior
        </div>
      </div>
      <div class="col-md-12 pt-5 pb-2 text-center">
        <div class="invalido" *ngIf="isError">
          {{ error }}
        </div>
      </div>
      <div class="row p-0">
        <div class="col-6 text-end pe-0">
          <button *ngIf="!actualizacion" class="btn btn-secondary" routerLink="/home" type="submit">
            Cancelar
          </button>
          <button *ngIf="actualizacion" class="btn btn-secondary" (click)="cancelar= true; getInfoBasica();" type="submit">
            Cancelar
          </button>
        </div>
        <div class="col-6 text-start ps-4">
          <button *ngIf="!actualizacion"
            id="id-bt-registro-user"
            class="btn btn-primary"
            type="submit"
            [disabled]="
              !usuario.valid ||
              !emailValid ||
              usuario.value.tipo_identificacion == '0' ||
              usuario.value.pais_nacimiento == '0' ||
              usuario.value.ciudad_nacimiento == '0' ||
              usuario.value.pais_residencia == '0' ||
              usuario.value.ciudad_residencia == '0' ||
              usuario.value.altura == '0' ||
              usuario.value.peso == '0' ||
              usuario.value.antiguedad_residencia == '0' ||
              generoValid == '' ||
              (!usuario.value.atletismo && !usuario.value.ciclismo)
            "
            (click)="cancelar= false; registro()"
          >
            Registrar
          </button>
          <button *ngIf="actualizacion"
            id="id-bt-registro-user"
            class="btn btn-primary"
            type="submit"
            [disabled]="
              !usuario.valid ||
              usuario.value.tipo_identificacion == '0' ||
              usuario.value.pais_nacimiento == '0' ||
              usuario.value.ciudad_nacimiento == '0' ||
              usuario.value.pais_residencia == '0' ||
              usuario.value.ciudad_residencia == '0' ||
              usuario.value.altura == '0' ||
              usuario.value.peso == '0' ||
              usuario.value.antiguedad_residencia == '0' ||
              generoValid == '' ||
              (!usuario.value.atletismo && !usuario.value.ciclismo)
            "
            (click)="cancelar= true; actualizar()"

          >
            Actualizar
          </button>
        </div>
      </div>
    </form>
  `,
  styles: ``,
})
export class FormularioRegistroUsuarioComponent {
  constructor(
    readonly listaDocumentoService: ListasService,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  @Input() actualizacion!: boolean;

  emailValid: boolean = false;
  deporteValid: boolean = false;
  generoValid: string = '';
  generoSelected: string = '';
  listaCiudadNacimineto: Ciudad[] = [];
  listaCiudadResidencia: Ciudad[] = [];
  isError: boolean = false;
  error: string = '';
  deportes: Deporte[] = [{ atletismo: '0' }, { ciclismo: '0' }];
  edicion: boolean = false;
  cancelar : boolean = false;

  usuario = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    tipo_identificacion: new FormControl('0', [Validators.required]),
    numero_identificacion: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    email: new FormControl('', [Validators.required]),
    genero: new FormControl(''),
    edad: new FormControl('', [Validators.required, Validators.max(999)]),
    peso: new FormControl('', [Validators.required, Validators.max(999)]),
    altura: new FormControl('', [Validators.required, Validators.max(999)]),
    pais_nacimiento: new FormControl('0', [Validators.required]),
    ciudad_nacimiento: new FormControl('0', [Validators.required]),
    pais_residencia: new FormControl('0', [Validators.required]),
    ciudad_residencia: new FormControl('0', [Validators.required]),
    antiguedad_residencia: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmacion_contrasena: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    atletismo: new FormControl(),
    ciclismo: new FormControl(),
  });

  registro() {
    this.isError = false;
    this.error = '';

    if (
      this.usuario.valid &&
      this.emailValid &&
      this.usuario.value.tipo_identificacion != '0' &&
      this.usuario.value.pais_nacimiento != '0' &&
      this.usuario.value.ciudad_nacimiento != '0' &&
      this.usuario.value.pais_residencia != '0' &&
      this.usuario.value.ciudad_residencia != '0' &&
      this.usuario.value.altura != '0' &&
      this.usuario.value.peso != '0' &&
      this.usuario.value.antiguedad_residencia != '0' &&
      this.generoValid != '' &&
      (this.usuario.value.atletismo || this.usuario.value.ciclismo)
      || this.cancelar
    ) {

      if(this.usuario.value.contrasena != this.usuario.value.confirmacion_contrasena){
        this.isError = true;
        this.error = "Las contraseñas ingresadas no coinciden";
        return
      }

      this.deportes[0].atletismo = this.usuario.value.atletismo ? '1' : '0';
      this.deportes[1].ciclismo = this.usuario.value.ciclismo ? '1' : '0';

      const usuarioRegistro: Usuario = {
        nombre: this.usuario.value.nombre!,
        apellido: this.usuario.value.apellido!,
        tipo_identificacion: this.usuario.value.tipo_identificacion!,
        numero_identificacion: this.usuario.value.numero_identificacion!,
        email: this.usuario.value.email!,
        genero: this.generoSelected!,
        edad: this.usuario.value.edad!,
        peso: this.usuario.value.peso!,
        altura: this.usuario.value.altura!,
        pais_nacimiento: this.usuario.value.pais_nacimiento!,
        ciudad_nacimiento: this.usuario.value.ciudad_nacimiento!,
        pais_residencia: this.usuario.value.pais_residencia!,
        ciudad_residencia: this.usuario.value.ciudad_residencia!,
        antiguedad_residencia: this.usuario.value.antiguedad_residencia!,
        contrasena: this.usuario.value.contrasena!,
        deportes: this.deportes,
      };

      if (!this.actualizacion) {
        usuarioRegistro.contrasena = btoa(this.usuario.value.contrasena!);
        this.usuarioService.addUsuario(usuarioRegistro).subscribe(
          (resp) => {
            this.login(usuarioRegistro.email, usuarioRegistro.contrasena);
            this.clearForm(usuarioRegistro.contrasena!);
            this.isError = false;
          },
          (err) => {
            this.isError = true;
            this.error = err.message;
          }
        );
      }
    }
  }

  actualizar() {
    if (
      this.usuario.valid &&
      this.usuario.value.tipo_identificacion != '0' &&
      this.usuario.value.pais_nacimiento != '0' &&
      this.usuario.value.ciudad_nacimiento != '0' &&
      this.usuario.value.pais_residencia != '0' &&
      this.usuario.value.ciudad_residencia != '0' &&
      this.usuario.value.altura != '0' &&
      this.usuario.value.peso != '0' &&
      this.usuario.value.antiguedad_residencia != '0' &&
      this.generoValid != '' &&
      (this.usuario.value.atletismo || this.usuario.value.ciclismo)
      || this.cancelar
    ) {
      this.deportes[0].atletismo = this.usuario.value.atletismo ? '1' : '0';
      this.deportes[1].ciclismo = this.usuario.value.ciclismo ? '1' : '0';

      const usuarioRegistroUp: UsuarioUpd = {
        nombre: this.usuario.value.nombre!,
        apellido: this.usuario.value.apellido!,
        tipo_identificacion: this.usuario.value.tipo_identificacion!,
        numero_identificacion: this.usuario.value.numero_identificacion!,
        genero: this.generoSelected!,
        edad: this.usuario.value.edad!,
        peso: this.usuario.value.peso!,
        altura: this.usuario.value.altura!,
        pais_nacimiento: this.usuario.value.pais_nacimiento!,
        ciudad_nacimiento: this.usuario.value.ciudad_nacimiento!,
        pais_residencia: this.usuario.value.pais_residencia!,
        ciudad_residencia: this.usuario.value.ciudad_residencia!,
        antiguedad_residencia: this.usuario.value.antiguedad_residencia!,
        deportes: this.deportes,
      };

      if (this.actualizacion) {
        this.usuarioService.updInfoBasicaUsuario(usuarioRegistroUp).subscribe(
          (resp) => {
            this.toastr.success('Actualización exitosa', 'Cada vez más cerda de tus objetivos');
            this.isError = false;
          },
          (err) => {
            this.isError = true;
            this.error = err.message;
          }
        );
      }
    }
  }

  login(email: string, contrasena: string) {
    if (email != null && contrasena != null) {
      const loginUsuario: LoginUsuario = {
        email: email,
        contrasena: contrasena,
      };
      this.usuarioService.loginUsuarios(loginUsuario).subscribe(
        (resp) => {
          if (resp.token == '') {
            this.router.navigate(['/login-usuarios']);
            return;
          }
          this.usuarioService.registrarToken(resp.token);
          this.router.navigate(['/planes-subscripcion']);
          this.isError = false;
        },
        (err) => {
          this.isError = true;
          this.error = err.message;
        }
      );
    } else {
      this.router.navigate(['/login-usuarios']);
      return;
    }
  }
  setGenero(value: string) {
    this.generoSelected = value;
    this.generoValid = 'ok';
  }

  clearForm(contrasena: string | undefined): void {
    if (contrasena) {
      this.usuario.value.contrasena = '';
      return;
    }
  }

  getCiudadNacimiento() {
    this.listaCiudadNacimineto = this.listaDocumentoService.listaCiudad.filter(
      (x) => x.pais == this.usuario.value.pais_nacimiento
    );
  }

  getCiudadResidencia() {
    this.listaCiudadResidencia = this.listaDocumentoService.listaCiudad.filter(
      (x) => x.pais == this.usuario.value.pais_residencia
    );
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
  getInfoBasica() {
    this.usuarioService.getInfoBasicaUsuario().subscribe(
      (info) => {
        let infoBasica = info;
        let marcarAtletismo : boolean = false;
        let marcarCiclismo : boolean = false;
        let contrasena =  atob(info.contrasena);
        if(infoBasica.deportes){
          for(let i = 0; i < infoBasica.deportes.length; i++){
            if(infoBasica.deportes[i] == "Atletismo"){
              marcarAtletismo = true;
            }
            else if(infoBasica.deportes[i] == "Ciclismo"){
              marcarCiclismo = true;
            }
          }
        }
        
        this.usuario = new FormGroup({
          nombre: new FormControl(infoBasica.nombre, [
            Validators.required,
            Validators.maxLength(50),
          ]),
          apellido: new FormControl(infoBasica.apellido, [
            Validators.required,
            Validators.maxLength(50),
          ]),
          tipo_identificacion: new FormControl(infoBasica.tipo_identificacion, [
            Validators.required,
          ]),
          numero_identificacion: new FormControl(
            infoBasica.numero_identificacion,
            [Validators.required, Validators.maxLength(15)]
          ),
          email: new FormControl(infoBasica.email),
          genero: new FormControl(),
          edad: new FormControl(infoBasica.edad, [
            Validators.required,
            Validators.max(999),
          ]),
          peso: new FormControl(infoBasica.peso, [
            Validators.required,
            Validators.max(999),
          ]),
          altura: new FormControl(infoBasica.altura, [
            Validators.required,
            Validators.max(999),
          ]),
          pais_nacimiento: new FormControl(infoBasica.pais_nacimiento, [
            Validators.required,
          ]),
          ciudad_nacimiento: new FormControl(infoBasica.ciudad_nacimiento, [
            Validators.required,
          ]),
          pais_residencia: new FormControl(infoBasica.pais_residencia, [
            Validators.required,
          ]),
          ciudad_residencia: new FormControl(infoBasica.ciudad_residencia, [
            Validators.required,
          ]),
          antiguedad_residencia: new FormControl(
            infoBasica.antiguedad_residencia,
            [Validators.required]
          ),
          contrasena: new FormControl(contrasena),
          confirmacion_contrasena: new FormControl(contrasena),
          atletismo: new FormControl(marcarAtletismo? '1':null),
          ciclismo: new FormControl(marcarCiclismo?'1':null),
        });
        this.setGenero(infoBasica.genero);
        this.getCiudadNacimiento();
        this.getCiudadResidencia();
        this.isError = false;
        // if()
      },
      (err) => {
        if (err.code != 400) {
          this.isError = true;
          this.error = err.message;
        }
      }
    );
  }

  ngOnInit(): void {
    if(this.actualizacion){
      this.getInfoBasica()
    }
  }
}
