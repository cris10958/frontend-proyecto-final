import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavSociosComponent } from './nav-socios.component';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AdicionalEjercicio,
  Ejercicio,
  Fotos,
  ProductoServicioLista,
  ProductosServiciosService,
  VistaEjercicio,
} from './productos-servicios.service';
import { CommonModule } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-detalle-productos-servicios',
  standalone: true,
  imports: [NavSociosComponent, CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="fd-color h-total w-100 row-col-12 justify-content-center pb-5">
      <div class="container-fluid p-0 brand-hover">
        <app-nav-socios></app-nav-socios>
      </div>
      <div class="row-col-12 ps-4 pb-1">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/list-productos-servicios">Productos y servicios</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Detalle</li>
          </ol>
        </nav>
      </div>
      <div class="row-col-12 ps-4 pb-1">
        <img
          src="./assets/icon/arrow_back.png"
          (click)="irAtras()"
          style="cursor:pointer;"
          alt="imagen_hacia_atras"
        />
      </div>
      <div class="row p-4 ps-5">
        <div class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 col-xxl-10">
          <div class="row">
            <div
              class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2"
              style="max-height: 50vh; overflow: auto;"
            >
              <div
                class="row p-2 pt-0"
                *ngFor="let foto of datos_detalle.fotos"
              >
                <div class="col-12">
                  <img
                    [src]="'data:image/png;base64,' + foto.foto"
                    style="width: 100%; height: 8em; cursor:pointer;"
                    alt="Porducto o servicios"
                    class="border"
                    (click)="seleccionarFoto(foto)"
                  />
                </div>
              </div>
              <div *ngIf="sinImagen" class="row p-2 pt-0">
                <div class="col-12">
                  <img
                    [src]="foto_seleccionda.foto"
                    style="width: 100%; height: 8em; cursor:pointer;"
                    alt="Porducto o servicios"
                    class="border"
                  />
                </div>
              </div>
            </div>
            <div class="col-8 col-sm-8 col-md-8 col-lg-5 col-xl-5 col-xxl-5">
              <img
                *ngIf="!sinImagen"
                [src]="'data:image/png;base64,' + foto_seleccionda.foto"
                style="width: 100%; height: 50vh;"
                alt="Porducto o servicios"
                class="border"
              />
              <img
                *ngIf="sinImagen"
                [src]="foto_seleccionda.foto"
                style="width: 100%; height: 50vh;"
                alt="Porducto o servicios"
                class="border"
              />
            </div>
            <div
              class="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 pt-3"
            >
              <div class="row">
                <div class="col-12 pb-4">
                  <h6 class="color-letra-gray-800">
                    Descripción: {{ datos_detalle.descripcion }}
                  </h6>
                </div>
                <div class="col-12">
                  <h6 class="color-letra-on-primary-container">
                    {{ valorAjustado }}
                  </h6>
                </div>
                <div class="col-12">
                  <h6 class="small color-letra-gray-600">
                    Lugar disponibilidad:
                    {{ datos_detalle.lugar_entrega_prestacion }}
                  </h6>
                </div>
                <div class="col-12">
                  <h6 class="small color-letra-gray-600">
                    Deporte: {{ datos_detalle.deporte }}
                  </h6>
                </div>
                <div class="col-12">
                  <h6 class="small color-letra-on-primary-container">
                    Tipo: {{ tipo_ajustado }}
                  </h6>
                </div>
                <div class="col-12">
                  <h6 class="small color-letra-gray-600">
                    Tipo de Producto / Servicio:
                    {{ datos_detalle.subtipo_servicio_producto }}
                  </h6>
                </div>
                <div class="col-12">
                  <h6 class="small color-letra-gray-600">
                    Fecha de entrega o prestación: {{ fecha_ajustada }}
                  </h6>
                </div>
                <div class="col-12">
                  <h6 class="small color-letra-gray-600">
                    Disponibles: {{ datos_detalle.cantidad_disponible }}
                  </h6>
                </div>
                <div class="col-12" *ngIf="sesioPersonalizada">
                  <h6 class="small color-letra-gray-600">
                    Nombre de la sesión:
                    {{ detalle_sesion_deportiva.value.nombre_sesion }}
                  </h6>
                </div>
                <div class="col-12" *ngIf="sesioPersonalizada">
                  <h6 class="small color-letra-gray-600">
                    Número de ejercicios que contiene:
                    {{ detalle_sesion_deportiva.value.numero_ejercicios }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row ps-5 pt-4 pb-5 justify-content-start"
        *ngIf="sesioPersonalizada"
      >
        <div class="col-12">
          <label
            for="id-aviso"
            class="form-label color-letra-on-primary-container"
            >Detalle de la sesión deportiva personalizada</label
          >
        </div>
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 me-4 mt-3 p-5 shadow-sm border rounded"
          *ngFor="let form of lista_ejercicios; let i = index"
        >
          <div class="row g-3">
            <div class="col-12 text-start pt-2">
              <h1 class="small">{{ form.adicional.titulo }}</h1>
            </div>
            <div class="col-12">
              <label for="id-name-ejercicio" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control fd-color white"
                id="id-name-ejercicio"
                [(ngModel)]="form.detalle_ejercicio.nombre"
                [disabled]="true"
              />
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
                  [(ngModel)]="form.detalle_ejercicio.descripcion"
                  [disabled]="true"
                ></textarea>
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
                [disabled]="true"
              />
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
                [disabled]="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class DetalleProductosServiciosComponent implements OnInit {
  lista_ejercicios: Array<VistaEjercicio> = [];
  fotos: Array<Fotos> = [];
  datos_detalle: ProductoServicioLista = {
    descripcion: '',
    deporte: '',
    subtipo_servicio_producto: '',
    pais: '',
    ciudad: '',
    lugar_entrega_prestacion: '',
    cantidad_disponible: 0,
    fecha_entrega_prestacion: '',
    valor: 0,
    fotos: this.fotos,
    id: '',
    tipo_servicio_producto: '',
  };
  id_producto_servicio: string = '';
  valorAjustado: string = '';
  tipo_ajustado: string = '';
  fecha_ajustada: string = '';
  sesioPersonalizada: boolean = false;
  foto_seleccionda: any = {
    foto: '',
    orden: 0,
  };
  sinImagen: boolean = false;

  detalle_sesion_deportiva = new FormGroup({
    nombre_sesion: new FormControl(''),
    numero_ejercicios: new FormControl(1),
  });

  irAtras() {
    this.router.navigate(['/list-productos-servicios']);
  }

  formatoValores() {
    const formatoPesos = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    });
    const valorFormato = formatoPesos.format(this.datos_detalle.valor ?? 0);
    this.valorAjustado = valorFormato;

    if (this.datos_detalle.tipo_servicio_producto == 'producto') {
      this.tipo_ajustado = 'Producto';
    } else if (this.datos_detalle.tipo_servicio_producto == 'servicio') {
      this.tipo_ajustado = 'Servicio';
    }

    const diaObjeto = moment.utc(
      `${this.datos_detalle.fecha_entrega_prestacion}`
    );
    this.fecha_ajustada = diaObjeto.format('DD/MM/YYYY hh:mm a');
  }

  getSesionPersonalizada() {
    this.productosServiciosService
      .getSesionDeportiva(this.id_producto_servicio)
      .subscribe(
        (info) => {
          const datos_sesion = info;

          for (let i = 0; i < datos_sesion.ejercicios.length; i++) {
            let ejercicio: Ejercicio = datos_sesion.ejercicios[i];

            let adiciona_ejercicio: AdicionalEjercicio = {
              titulo: 'Ejericio ' + (i + 1),
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

          this.detalle_sesion_deportiva = new FormGroup({
            nombre_sesion: new FormControl(datos_sesion.nombre_sesion),
            numero_ejercicios: new FormControl(this.lista_ejercicios.length),
          });
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getInfoProductoServicio() {
    this.productosServiciosService
      .getDetalleProductoServicio(this.id_producto_servicio)
      .subscribe(
        (info) => {
          this.datos_detalle = info[0];
          this.foto_seleccionda = this.datos_detalle.fotos.filter(
            (foto) => foto.orden == 1
          );
          if (this.foto_seleccionda.length > 0) {
            this.foto_seleccionda = this.foto_seleccionda[0];
            this.sinImagen = false;
          } else {
            this.sinImagen = true;
            this.foto_seleccionda = {
              foto: './assets/img/prod-serv.png',
              orden: 0,
            };
          }
          this.formatoValores();
          if (
            this.datos_detalle.subtipo_servicio_producto ==
            'Sesión personalizada'
          ) {
            this.getSesionPersonalizada();
            this.sesioPersonalizada = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  seleccionarFoto(foto: any) {
    this.foto_seleccionda = foto;
  }

  ngOnInit(): void {
    const id = this.activateRoute.params.subscribe((params) => {
      this.id_producto_servicio = params['id'];
      this.getInfoProductoServicio();
    });
  }

  constructor(
    private router: Router,
    private productosServiciosService: ProductosServiciosService,
    private activateRoute: ActivatedRoute
  ) {}
}
