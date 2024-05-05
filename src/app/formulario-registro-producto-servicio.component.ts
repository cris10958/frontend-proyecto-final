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
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AdicionalEjercicio,
  Ejercicio,
  Fotos,
  ProductoServicio,
  ProductosServiciosService,
  SesionPerzonalizada,
  VistaEjercicio,
} from './productos-servicios.service';
import { flatMap } from 'rxjs';
import {
  Ciudad,
  ListasService,
  listProductosServivicio,
} from './listas.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-registro-producto-servicio',
  standalone: true,
  imports: [
    FooterComponent,
    NavSociosComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    CommonModule,
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
          <div class="row pt-3 justify-content-center pt-5 pb-1">
            <div class="col-12">
              <form class="row g-3" [formGroup]="detalle_registro">
                <div class="col-12">
                  <label for="id-descripcion" class="form-label"
                    >Descripción</label
                  >
                  <textarea
                    class="form-control fd-color white"
                    id="id-descripcion"
                    formControlName="descripcion"
                    style="height: 100px;"
                    [class]="{
                      'is-invalid':
                        detalle_registro.get('descripcion')?.invalid &&
                        (detalle_registro.get('descripcion')?.dirty ||
                          detalle_registro.get('descripcion')?.touched)
                    }"
                    required
                  ></textarea>
                  <div class="invalid-feedback">
                    Por favor registre la descripcion del producto o del
                    servicio
                  </div>
                </div>
                <div class="col-12">
                  <ngx-dropzone
                    (change)="onSelect($event)"
                    [multiple]="true"
                    accept="image/jpeg, image/jpg, image/png, image/gif"
                    class="caja-dropzone"
                    [maxFileSize]="50000"
                  >
                    <ngx-dropzone-label class="color-letra-gray-900 text-14"
                      >Adjunta imagenes arrastrandolas y colocandolas aquí.
                      Seleccionandolos o pegandoloes</ngx-dropzone-label
                    >
                  </ngx-dropzone>
                </div>
                <div class="col-md-12 pb-2 text-start">
                  <div class="invalido" *ngIf="error_dropzone != ''">
                    {{ error_dropzone }}
                  </div>
                </div>
                <div class="row ps-4 pb-2">
                  <div
                    *ngFor="let img of imgBase64; let i = index"
                    class="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2 col-xxl-2 caja-imagen rounded position-relative ms-0 me-4 mt-3"
                    (mouseover)="img.hover = true"
                    (mouseleave)="img.hover = false"
                  >
                    <span
                      *ngIf="i == 0 && img.hover == false"
                      class="position-absolute top-0 start-100 translate-middle badge bg-primary"
                      >Portada</span
                    >
                    <span
                      *ngIf="i != 0 && img.hover == false"
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                      >{{ i + 1 }}</span
                    >
                    <span
                      *ngIf="img.hover == true"
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                      style="cursor:pointer;"
                      (click)="onRemove(i)"
                      >x</span
                    >
                    <img
                      [src]="'data:image/png;base64,' + img.content"
                      class="ico-brand-w"
                      alt="logo"
                    />
                  </div>
                </div>
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 "
                >
                  <label for="id-tipo" class="form-label"
                    >Deporte al que va dirigido</label
                  >
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="RadioDeporteDir"
                      id="id-deporte-atletismo"
                      (click)="seleccionarDeporte(1)"
                    />
                    <label class="form-check-label" for="id-deporte-atletismo">
                      Atletismo
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="RadioDeporteDir"
                      id="id-deporte-ciclismo"
                      (click)="seleccionarDeporte(2)"
                    />
                    <label class="form-check-label" for="id-deporte-ciclismo">
                      Ciclismo
                    </label>
                  </div>
                  <div class="invalid-feedback">
                    Por favor seleccione el deporte al que va dirigido
                  </div>
                </div>
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 "
                >
                  <label for="id-tipo" class="form-label">Tipo</label>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="RadioTipo"
                      id="id-tipo-producto"
                      (click)="filtrarProductos()"
                    />
                    <label class="form-check-label" for="id-tipo-producto">
                      Producto
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="RadioTipo"
                      id="id-tipo-servicio"
                      (click)="filtrarServicios()"
                    />
                    <label class="form-check-label" for="id-tipo-servicio">
                      Servicio
                    </label>
                  </div>
                  <div class="invalid-feedback">
                    Por favor seleccione si el registro es de tipo producto o
                    servicio
                  </div>
                </div>
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4"
                >
                  <label
                    id="id-label-tipo-lista"
                    for="id-tipo-lista"
                    class="form-label"
                    >Tipo de producto / servicio</label
                  >
                  <select
                    id="id-tipo-lista"
                    class="form-select fd-color white"
                    formControlName="subtipo_producto_servicio"
                    [class]="{
                      'is-invalid':
                        (detalle_registro.get('subtipo_producto_servicio')
                          ?.invalid ||
                          detalle_registro.value.subtipo_producto_servicio ==
                            '') &&
                        (detalle_registro.get('subtipo_producto_servicio')
                          ?.dirty ||
                          detalle_registro.get('subtipo_producto_servicio')
                            ?.touched)
                    }"
                  >
                    <option value="" disabled>Seleccione uno</option>
                    <option
                      [value]="list.key"
                      *ngFor="let list of lista_productos"
                    >
                      {{ list.value }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    Por favor el tipo de producto / servicio
                  </div>
                </div>
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4"
                >
                  <label
                    id="id-label-pais-disponible"
                    for="id-pais-disponible"
                    class="form-label"
                    >País en donde se encuentra disponible</label
                  >
                  <select
                    id="id-pais-disponible"
                    (change)="getCiudadDisponible()"
                    class="form-select fd-color white"
                    formControlName="pais_disponible"
                    [class]="{
                      'is-invalid':
                        (detalle_registro.get('pais_disponible')?.invalid ||
                          detalle_registro.value.pais_disponible == '') &&
                        (detalle_registro.get('pais_disponible')?.dirty ||
                          detalle_registro.get('pais_disponible')?.touched)
                    }"
                  >
                    <option value="" disabled>Seleccione uno</option>
                    <option
                      [value]="pais.key"
                      *ngFor="let pais of listaDocumentoService.listaPais"
                    >
                      {{ pais.value }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    Por favor seleccione su país en donde se encuentra
                    disponible el producto o servicio
                  </div>
                </div>
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4"
                >
                  <label
                    id="id-label-ciuda-disponible"
                    for="id-ciudad-disponible"
                    class="form-label"
                    >Ciudad en donde se encuentra disponible</label
                  >
                  <select
                    id="id-ciudad-disponible"
                    class="form-select fd-color white"
                    formControlName="ciudad_disponible"
                    [class]="{
                      'is-invalid':
                        (detalle_registro.get('ciudad_disponible')?.invalid ||
                          detalle_registro.value.ciudad_disponible == '') &&
                        (detalle_registro.get('ciudad_disponible')?.dirty ||
                          detalle_registro.get('ciudad_disponible')?.touched)
                    }"
                  >
                    <option value="" disabled>Seleccione uno</option>
                    <option
                      [value]="ciudad.key"
                      *ngFor="let ciudad of listaCiudadNDisponible"
                    >
                      {{ ciudad.value }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    Por favor seleccione su ciudad en donnde se encuentra
                    disponible el producto o servicio
                  </div>
                </div>
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 "
                >
                  <label for="id-lugar" class="form-label"
                    >Lugar de entrega o prestación</label
                  >
                  <input
                    type="text"
                    class="form-control fd-color white"
                    id="id-lugar"
                    formControlName="lugar"
                    [class]="{
                      'is-invalid':
                        detalle_registro.get('lugar')?.invalid &&
                        (detalle_registro.get('lugar')?.dirty ||
                          detalle_registro.get('lugar')?.touched)
                    }"
                    required
                  />
                  <div class="invalid-feedback">
                    Por favor ingrese el lugar de prestacion del servicio o
                    entrega del producto
                  </div>
                </div>
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 "
                >
                  <label for="id-cantidad-disponible" class="form-label"
                    >Cantidad disponible</label
                  >
                  <input
                    type="number"
                    min="1"
                    class="form-control fd-color white"
                    id="id-cantidad-disponible"
                    formControlName="cantidad"
                    [class]="{
                      'is-invalid':
                        detalle_registro.get('cantidad')?.invalid &&
                        (detalle_registro.get('cantidad')?.dirty ||
                          detalle_registro.get('cantidad')?.touched)
                    }"
                    required
                  />
                  <div class="invalid-feedback">
                    Por favor registre la cantidad de productos o servicios
                    disponibles
                  </div>
                </div>
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 "
                >
                  <label for="id-fecha-entrega" class="form-label"
                    >Fecha de entrega o prestación</label
                  >
                  <input
                    type="date"
                    class="form-control fd-color white"
                    id="id-fecha-entrega"
                    formControlName="fecha_entrega"
                    [class]="{
                      'is-invalid':
                        detalle_registro.get('fecha_entrega')?.invalid &&
                        (detalle_registro.get('fecha_entrega')?.dirty ||
                          detalle_registro.get('fecha_entrega')?.touched)
                    }"
                    [min]="min_fecha_entrega"
                    required
                  />
                  <div class="invalid-feedback">
                    Por favor registre la fecha de entrega o de prestación del
                    servicio
                  </div>
                </div>
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 "
                >
                  <label for="id-valor" class="form-label">Valor</label>
                  <input
                    type="string"
                    class="form-control fd-color white"
                    id="id-valor"
                    formControlName="valor"
                    [class]="{
                      'is-invalid':
                        (detalle_registro.get('valor')?.invalid ||
                          limpiarFormatoMoneda(detalle_registro.value.valor) ==
                            0) &&
                        (detalle_registro.get('valor')?.dirty ||
                          detalle_registro.get('valor')?.touched)
                    }"
                    (change)="formatoMoneda()"
                    required
                  />
                  <label class="form-label">{{ valorFormato }}</label>
                  <div class="invalid-feedback">
                    Por favor registre el costo del servicio o del producto
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            *ngIf="
              detalle_registro.value.subtipo_producto_servicio ==
              'Sesión personalizada'
            "
            class="row justify-content-center pb-5"
          >
            <div class="col-12">
              <form class="row g-3" [formGroup]="detalle_sesion_deportiva">
                <div class="col-12">
                  <label
                    for="id-aviso"
                    class="form-label color-letra-on-primary-container"
                    >Resgistre los siguientes campos en caso de que el servicio
                    sea una sesión perzonalizada</label
                  >
                </div>
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 "
                >
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
                <div
                  class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 "
                >
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
                class="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 me-4 mt-3 p-5 shadow-sm border rounded"
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
                      [(ngModel)]="form.detalle_ejercicio.cantidad_repeticiones"
                      (click)="validarCampoTexto('cantidad_repeticiones', i)"
                      (input)="validarCampoTexto('cantidad_repeticiones', i)"
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
          </div>
          <div class="pb-5">
            <div class="col-md-12 pt-5 pb-2 text-center">
              <div class="invalido" *ngIf="isError">
                {{ error }}
              </div>
            </div>
            <div class="row pt-2">
              <div class="col-6 text-end pe-0">
                <button
                  class="btn btn-secondary"
                  routerLink="/list-productos-servicios"
                  type="submit"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-6 text-start ps-4">
                <button
                  id="id-bt"
                  class="btn btn-primary"
                  type="submit"
                  (click)="registro()"
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
  lista_productos: Array<listProductosServivicio> = [];
  listaCiudadNDisponible: Ciudad[] = [];
  files: File[] = [];
  imgBase64: Array<any> = [];
  error_dropzone: string = '';
  valorFormato: string = '';
  min_fecha_entrega: string = '';

  detalle_registro = new FormGroup({
    deporte: new FormControl('', [Validators.required]),
    subtipo_producto_servicio: new FormControl('', [Validators.required]),
    pais_disponible: new FormControl('', [Validators.required]),
    ciudad_disponible: new FormControl('', [Validators.required]),
    lugar: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    cantidad: new FormControl(1, [Validators.min(1)]),
    valor: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.maxLength(500),
    ]),
    fecha_entrega: new FormControl('', [Validators.required]),
  });

  detalle_sesion_deportiva = new FormGroup({
    nombre_sesion: new FormControl('', Validators.required),
    numero_ejercicios: new FormControl(1, [
      Validators.min(1),
      Validators.max(20),
      Validators.required,
    ]),
  });

  cambioCantEjercicios() {
    let cant_registrada: number =
      this.detalle_sesion_deportiva.value.numero_ejercicios ?? 0;
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
  }

  agregarEjercicio() {
    let indice = this.lista_ejercicios.length;
    indice += 1;
    let ejercicio: Ejercicio = {
      nombre: null,
      descripcion: null,
      cantidad_repeticiones: null,
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

  registrarSesion(id_servicio_producto: string) {
    if (
      id_servicio_producto == null ||
      id_servicio_producto == undefined ||
      id_servicio_producto == ''
    ) {
      this.toastr.success(
        "Error en el registro', 'La sesión personalizada no se registró correctamente, por favor comuníquese con el administrado"
      );
      return;
    }

    for (let i = 0; i < this.lista_ejercicios.length; i++) {
      this.ejercicios.push(this.lista_ejercicios[i].detalle_ejercicio);
    }
    const detalle_sesion: SesionPerzonalizada = {
      id_servicio_producto: id_servicio_producto,
      nombre_sesion: this.detalle_sesion_deportiva.value.nombre_sesion ?? '',
      ejercicios: this.ejercicios,
    };

    this.productosServiciosService
      .addSesionPersonalizada(detalle_sesion)
      .subscribe(
        (resp) => {
          this.toastr.success('Registro exitoso', 'Hacemos un gran equipo');
          this.router.navigate(["/list-productos-servicios"])

        },
        (err) => {
          this.isError = true;
          this.error = err.message;
        }
      );
  }
  registro() {
    this.error_dropzone = '';
    this.isError = false;
    this.error = '';

    if (this.imgBase64.length < 1) {
      this.error_dropzone =
        'Por favor registre al menos una foto del producto o servicio';
      this.isError = true;
      this.error = 'Por favor registre la información solicitada';
      return;
    }

    if (
      this.detalle_registro.value.subtipo_producto_servicio ==
      'Sesión personalizada'
    ) {
      if (!this.validacionTotal() || this.detalle_sesion_deportiva.invalid) {
        this.isError = true;
        this.error =
          'Por favor registre la información requerida en los ejercicios de la sesión deportiva';
        return;
      }

      const cantidad = this.detalle_registro.value.cantidad ?? 0;
      if (cantidad < 0 || cantidad == 0) {
        this.isError = true;
        this.error =
          'Se requiere al menos un ejercicio para registrar la sesión deportiva';
        return;
      }
    }

    if (
      this.detalle_registro.valid &&
      this.limpiarFormatoMoneda(this.detalle_registro.value.valor) != 0
    ) {
      const fotos: Fotos[] = [];
      for (let i = 0; i < this.imgBase64.length; i++) {
        fotos.push({
          foto: this.imgBase64[i].content,
          orden: i + 1,
        });
      }

      let registro: ProductoServicio = {
        descripcion: this.detalle_registro.value.descripcion ?? '',
        deporte: this.detalle_registro.value.deporte ?? '',
        subtipo_servicio_producto:
          this.detalle_registro.value.subtipo_producto_servicio ?? '',
        pais: this.detalle_registro.value.pais_disponible ?? '',
        ciudad: this.detalle_registro.value.ciudad_disponible ?? '',
        lugar_entrega_prestacion: this.detalle_registro.value.lugar ?? '',
        cantidad_disponible: this.detalle_registro.value.cantidad ?? 0,
        fecha_entrega_prestacion:
          this.detalle_registro.value.fecha_entrega ?? '',
        valor:
          this.limpiarFormatoMoneda(this.detalle_registro.value.valor) ?? 0,
        foto: fotos,
      };

      this.productosServiciosService.addProductoServicio(registro).subscribe(
        (resp) => {
          if (
            this.detalle_registro.value.subtipo_producto_servicio ==
            'Sesión personalizada'
          ) {
            if (
              resp.id_servicio_producto == null ||
              resp.id_servicio_producto == undefined ||
              resp.id_servicio_producto == ''
            ) {
              this.toastr.success(
                "Error en el registro', 'La sesión personalizada no se registró correctamente, por favor comuníquese con el administrado"
              );
              return;
            }

            this.registrarSesion(resp.id_servicio_producto);
          } else {
            this.toastr.success('Registro exitoso', 'Hacemos un gran equipo');
            this.router.navigate(["/list-productos-servicios"])
          }
        },
        (err) => {
          this.isError = true;
          this.error = err.message;
        }
      );
    } else {
      this.isError = true;
      this.error = 'Por favor registre toda la información';
    }
  }

  validacionTotal() {
    for (let i = 0; i < this.lista_ejercicios.length; i++) {
      this.validarCampoTexto('nombre', i);
      this.validarCampoTexto('cantidad_repeticiones', i);
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
    if (campo == 'cantidad_repeticiones') {
      if (
        this.lista_ejercicios[index].detalle_ejercicio.cantidad_repeticiones ==
          null ||
        this.lista_ejercicios[index].detalle_ejercicio.cantidad_repeticiones ==
          0 ||
        (this.lista_ejercicios[index].detalle_ejercicio.cantidad_repeticiones ??
          0) < 0
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

  filtrarServicios() {
    this.detalle_registro.get('subtipo_producto_servicio')?.setValue('');
    this.lista_productos =
      this.listaDocumentoService.listaProductosServicios.filter(
        (x) => x.tipo == 'servicio'
      );
  }

  filtrarProductos() {
    this.detalle_registro.get('subtipo_producto_servicio')?.setValue('');
    this.lista_productos =
      this.listaDocumentoService.listaProductosServicios.filter(
        (x) => x.tipo == 'producto'
      );
  }

  getCiudadDisponible() {
    this.detalle_registro.get('ciudad_disponible')?.setValue('');
    this.listaCiudadNDisponible = this.listaDocumentoService.listaCiudad.filter(
      (x) => x.pais == this.detalle_registro.value.pais_disponible
    );
  }

  onSelect(event: any) {
    this.isError = false;
    this.error_dropzone = '';
    if (this.files && this.files.length == 10) {
      this.error_dropzone = 'El límite de imágenes permitidas es de máximo 10';
      return;
    }
    this.files.push(...event.addedFiles);
    if (this.files && this.files.length > 10) {
      const diferencia = this.files.length - 10;
      for (let i = 0; i < diferencia; i++) {
        this.files.splice(10, 1);
      }
    }
    if (this.files && this.files[0]) {
      this.imgBase64 = [];
      for (let i = 0; i < this.files.length; i++) {
        this.fileToBase64(this.files[i]).then((result) => {
          const base64String = result.replace('data:', '').replace(/^.+,/, '');
          this.imgBase64.push({
            name: this.files[i].name,
            content: base64String,
            hover: false,
          });
        });
      }
    }
  }

  onRemove(index: number) {
    this.error_dropzone = '';
    this.files.splice(index, 1);
    this.imgBase64.splice(index, 1);
  }

  fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() ?? '');
      reader.onerror = (error) => reject(error);
    });
  };

  seleccionarDeporte(deporte: number) {
    if (deporte == 1) {
      this.detalle_registro.get('deporte')?.setValue('Atletismo');
    } else if (deporte == 2) {
      this.detalle_registro.get('deporte')?.setValue('Ciclismo');
    }
  }

  formatoMoneda() {
    const formatoPesos = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    });

    const valor: string = this.detalle_registro.value.valor ?? '';
    const valorFormato = formatoPesos.format(this.limpiarFormatoMoneda(valor));
    this.detalle_registro.get('valor')?.setValue(valorFormato);
  }

  limpiarFormatoMoneda(valor: any) {
    if (typeof valor == 'string' && valor.trim() != '') {
      valor = valor
        .replaceAll('$', '')
        .replaceAll('.', '')
        .replaceAll(',', '.')
        .replaceAll(' ', '');
      if (isNaN(valor)) {
        return 0;
      }
      return parseFloat(valor);
    } else if (valor === null || valor == undefined || valor == '') {
      return 0;
    }
    return valor;
  }

  limitesFechaEntrega() {
    const hoy = new Date();
    const dia =
      hoy.getDate() < 10
        ? '0' + hoy.getDate().toString()
        : hoy.getDate().toString();
    const mes =
      hoy.getMonth() + 1 < 10
        ? '0' + (hoy.getMonth() + 1).toString()
        : (hoy.getMonth() + 1).toString();
    const anio = hoy.getFullYear().toString();
    this.min_fecha_entrega = `${anio}-${mes}-${dia}`;
  }

  ngOnInit(): void {
    this.agregarEjercicio();
    this.limitesFechaEntrega();
  }

  constructor(
    private productosServiciosService: ProductosServiciosService,
    readonly listaDocumentoService: ListasService,
    private toastr: ToastrService,
    private router: Router
  ) {}
}
