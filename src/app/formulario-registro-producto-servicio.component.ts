import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './footer.component';
import { NavSociosComponent } from './nav-socios.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AdicionalEjercicio,
  Ejercicio,
  ProductoServicio,
  ProductosServiciosService,
  VistaEjercicio,
} from './productos-servicios.service';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-formulario-registro-producto-servicio',
  standalone: true,
  imports: [
    FooterComponent,
    NavSociosComponent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  template: `
    <div
      class="fd-color primary_container h-total w-100 row-col-12 justify-content-center pb-5"
    >
      <div class="container-fluid p-0 brand-hover">
        <app-nav-socios></app-nav-socios>
      </div>
      <div class="row-col-12 ps-4 pb-1">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">Productos y servicios</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Sin filtro
            </li>
          </ol>
        </nav>
      </div>
      <div
        id="id-base-registro-prod-ser"
        class="container-fluit row justify-content-center"
      >
        <div class="col-9 fd-color p-4 shadow rounded contenedor-form">
          <div class="row-col-12 text-center pt-3">
            <h1>Registro de nuevos productos o servicios</h1>
          </div>
          <div class="row pt-3 justify-content-center pt-5 pb-5">
            <div class="col-12">
              <form
                class="row g-3"
                [formGroup]="detalle_registro"
                (ngSubmit)="registro()"
              >
                <div class="col-md-4">
                  <label for="id-name-sesion" class="form-label"
                    >Nombre de la sesión</label
                  >
                  <input
                    type="text"
                    class="form-control fd-color white"
                    id="id-name-sesion"
                    formControlName="nombre_sesion"
                    [class]="{
                      'is-invalid':
                        detalle_registro.get('nombre_sesion')?.invalid &&
                        (detalle_registro.get('nombre_sesion')?.dirty ||
                          detalle_registro.get('nombre_sesion')?.touched)
                    }"
                    required
                  />
                  <div class="invalid-feedback">
                    Por favor registre su nombre de la sesión para continuar
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="id-numero-ejercicios" class="form-label"
                    >Número de ejercicios que contiene</label
                  >
                  <input
                    type="number"
                    min="1"
                    max="20"
                    class="form-control fd-color white"
                    id="id-numero-ejercicios"
                    formControlName="numero_ejercicios"
                    (change)="cambioCantEjercicios()"
                    [class]="{
                      'is-invalid':
                        detalle_registro.get('numero_ejercicios')?.invalid &&
                        (detalle_registro.get('numero_ejercicios')?.dirty ||
                          detalle_registro.get('numero_ejercicios')?.touched)
                    }"
                    required
                  />
                  <div class="invalid-feedback">
                    Por favor registre el número de ejercicios que tendrá la
                    sesión para continuar (maximo 20 ejercicios por sesión)
                  </div>
                </div>
              </form>
            </div>
            <div class="row pt-4 justify-content-center">
              <div
                class="col-5 me-4 mt-3 p-5 shadow-sm border rounded"
                *ngFor="let form of lista_ejercicios; let i = index"
              >
                <div class="row g-3">
                  <div class="col-12 text-start pt-2">
                    <h1 class="small">{{ form.adicional.titulo }}</h1>
                  </div>
                  <div class="col-12">
                    <label for="id-name-ejercicio" class="form-label"
                      >Nombre</label
                    >
                    <input
                      type="text"
                      class="form-control fd-color white"
                      id="id-name-ejercicio"
                      [(ngModel)]="form.detalle_ejercicio.nombre"
                      (click)="validarCampoTexto('nombre', i)"
                      (input)="validarCampoTexto('nombre', i)"
                      [class]="{
                        'is-invalid': form.adicional.nombre_invalido
                      }"
                      required
                    />
                    <div class="invalid-feedback">
                      Por favor registre su nombre del ejercicio
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="id-numero-ejercicios" class="form-label"
                      >Descripción</label
                    >
                    <div class="form-floating">
                      <textarea
                        class="form-control fd-color white"
                        placeholder="Registre la descripción de como se debe realizar el ejercicio"
                        id="floatingTextarea"
                        (click)="validarCampoTexto('descripcion', i)"
                        (input)="validarCampoTexto('descripcion', i)"
                        [(ngModel)]="form.detalle_ejercicio.descripcion"
                        [class]="{
                          'is-invalid': form.adicional.descripcion_invalido
                        }"
                        required
                      ></textarea>
                      <label
                        for="floatingTextarea"
                        class="color-letra-gray-600 small"
                        >Descripción del ejercicio</label
                      >
                    </div>
                    <div class="invalid-feedback">
                      Por favor registre la descripción de como se debe realizar
                      el ejercicio
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="id-name-ejercicio" class="form-label"
                      >Cantidad de repeticiones</label
                    >
                    <input
                      type="number"
                      class="form-control fd-color white"
                      id="id-name-ejercicio"
                      [(ngModel)]="form.detalle_ejercicio.repeticiones"
                      (click)="validarCampoTexto('repeticiones', i)"
                      (input)="validarCampoTexto('repeticiones', i)"
                      [class]="{
                        'is-invalid': form.adicional.repeticiones_invalido
                      }"
                      required
                    />
                    <div class="invalid-feedback">
                      Por favor registre la cantidad de repeticiones del
                      ejercicio que se deben hacer durante la sesión
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="id-name-ejercicio" class="form-label"
                      >Duración (minutos)</label
                    >
                    <input
                      type="number"
                      class="form-control fd-color white"
                      id="id-name-ejercicio"
                      [(ngModel)]="form.detalle_ejercicio.duracion"
                      (click)="validarCampoTexto('duracion', i)"
                      (input)="validarCampoTexto('duracion', i)"
                      [class]="{
                        'is-invalid': form.adicional.duracion_invalido
                      }"
                      required
                    />
                    <div class="invalid-feedback">
                      Por favor registre duración estimada para el ejercicio
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12 pt-5 pb-2 text-center">
              <div class="invalido" *ngIf="isError">
                {{ error }}
              </div>
            </div>
            <div class="row pt-2">
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
                  (click)="registro()"
                  [disabled]="!detalle_registro.valid"
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [
    `
      .contenedor-form {
        max-height: 74vh;
        min-height: 74vh;
        overflow: auto;
      }
    `,
  ],
})
export class FormularioRegistroProductoServicioComponent implements OnInit {
  lista_ejercicios: Array<VistaEjercicio> = [];
  ejercicios: Array<Ejercicio> = [];
  isError: boolean = false;
  error: string = '';

  detalle_registro = new FormGroup({
    nombre_sesion: new FormControl('', [Validators.required]),
    numero_ejercicios: new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(20),
    ]),
    ejercicios: new FormControl(''),
  });

  cambioCantEjercicios() {
    let cant_registrada: number =
      this.detalle_registro.value.numero_ejercicios ?? 0;
    if (this.lista_ejercicios.length - 1 < cant_registrada) {
      let faltante = cant_registrada - this.lista_ejercicios.length;
      for (let i = 0; i < faltante; i++) {
        this.agregarEjercicio();
      }
    } else {
      let quitar = this.lista_ejercicios.length - cant_registrada;
      for (let i = 0; i < quitar; i++) {
        this.quitarEjercicio();
      }
    }
    console.log(this.lista_ejercicios);
  }

  agregarEjercicio() {
    let indice = this.lista_ejercicios.length;
    indice += 1;
    let ejercicio: Ejercicio = {
      nombre: null,
      descripcion: null,
      repeticiones: null,
      duracion: null,
    };
    let adiciona_ejercicio: AdicionalEjercicio = {
      titulo: 'Ejericio ' + indice,
      nombre_invalido: false,
      descripcion_invalido: false,
      repeticiones_invalido: false,
      duracion_invalido: false,
    };
    let vista_ejercicio: VistaEjercicio = {
      adicional: adiciona_ejercicio,
      detalle_ejercicio: ejercicio,
    };
    this.lista_ejercicios.push(vista_ejercicio);
  }
  quitarEjercicio() {
    this.lista_ejercicios.pop();
  }

  registro() {
    if (this.validacionTotal() && this.detalle_registro.valid) {
      this.isError= false;
      for (let i = 0; i < this.lista_ejercicios.length; i++) {
        this.ejercicios.push(this.lista_ejercicios[i].detalle_ejercicio);
      }

      let registro: ProductoServicio = {
        nombre_sesion: this.detalle_registro.value.nombre_sesion ?? '',
        numero_ejercicios: this.detalle_registro.value.numero_ejercicios ?? 0,
        ejercicios: this.ejercicios,
      };

      console.log(registro);
      console.log('ok');
      // this.productosServiciosService.addProductoServicio(registro).subscribe(
      //   (resp) => {
      //     console.log('OK')
      //   },
      //   (err) => {
      //     this.isError = true;
      //     this.error = err.message;
      //   }
      // );
    }else{
      this.isError= true;
      this.error="Por favor registre toda la información"; 
    }
  }

  validacionTotal() {
    for (let i = 0; i < this.lista_ejercicios.length; i++) {
      this.validarCampoTexto('nombre', i);
      this.validarCampoTexto('repeticiones', i);
      this.validarCampoTexto('descripcion', i);
      this.validarCampoTexto('duracion', i);
    }

    for (let i = 0; i < this.lista_ejercicios.length; i++) {
      if (
        this.lista_ejercicios[i].adicional.nombre_invalido ||
        this.lista_ejercicios[i].adicional.repeticiones_invalido ||
        this.lista_ejercicios[i].adicional.descripcion_invalido ||
        this.lista_ejercicios[i].adicional.duracion_invalido
      ) {
        return false;
      }
    }
    return true;
  }

  validarCampoTexto(campo: any, index: number) {
    if (campo == 'nombre') {
      if (
        this.lista_ejercicios[index].detalle_ejercicio.nombre == '' ||
        this.lista_ejercicios[index].detalle_ejercicio.nombre == null
      ) {
        this.lista_ejercicios[index].adicional.nombre_invalido = true;
      } else {
        this.lista_ejercicios[index].adicional.nombre_invalido = false;
      }
      return;
    }
    if (campo == 'repeticiones') {
      if (
        this.lista_ejercicios[index].detalle_ejercicio.repeticiones == null ||
        this.lista_ejercicios[index].detalle_ejercicio.repeticiones == 0 ||
        (this.lista_ejercicios[index].detalle_ejercicio.repeticiones ?? 0) < 0
      ) {
        this.lista_ejercicios[index].adicional.repeticiones_invalido = true;
      } else {
        this.lista_ejercicios[index].adicional.repeticiones_invalido = false;
      }
      return;
    }
    if (campo == 'descripcion') {
      if (
        this.lista_ejercicios[index].detalle_ejercicio.descripcion == '' ||
        this.lista_ejercicios[index].detalle_ejercicio.descripcion == null
      ) {
        this.lista_ejercicios[index].adicional.descripcion_invalido = true;
      } else {
        this.lista_ejercicios[index].adicional.descripcion_invalido = false;
      }
      return;
    }
    if (campo == 'duracion') {
      if (
        this.lista_ejercicios[index].detalle_ejercicio.duracion == null ||
        this.lista_ejercicios[index].detalle_ejercicio.duracion == 0 ||
        (this.lista_ejercicios[index].detalle_ejercicio.duracion ?? 0) < 0
      ) {
        this.lista_ejercicios[index].adicional.duracion_invalido = true;
      } else {
        this.lista_ejercicios[index].adicional.duracion_invalido = false;
      }
      return;
    }
  }

  ngOnInit(): void {
    this.agregarEjercicio();
  }

  constructor(private productosServiciosService: ProductosServiciosService) {}
}
