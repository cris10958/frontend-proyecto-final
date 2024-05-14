import { Component } from '@angular/core';
import { NavUsuarioComponent } from './nav-usuario.component';
import { FooterComponent } from './footer.component';
import { ListProductosServiciosComponent } from './list-productos-servicios.component';
import { SociosService } from './socios.service';
import {
  ProductoServicioLista,
  ProductosServiciosService,
} from './productos-servicios.service';
import { Router } from '@angular/router';
import { CardProductosServiciosComponent } from './card-productos-servicios.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos-servicios-usuario',
  standalone: true,
  imports: [
    NavUsuarioComponent,
    FooterComponent,
    CardProductosServiciosComponent,
    CommonModule,
  ],
  template: `
    <div class="container-fluid p-0 brand-hover">
      <app-nav-usuario [selected]="'produc-service'"></app-nav-usuario>
    </div>
    <div id="id-base-socio" class="container-fluit"></div>
    <div class="pe-4 pt-3">
      <div class="row text-start">
        <div
          class="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 p-0 m-1 ps-4 text-end"
        >
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild w-100"
            (click)="tipoSelected = 'todo'; filtro('clear')"
            [class]="{
              active: tipoSelected == 'todo' && deporteSelected == '' && !propios
            }"
          >
            Todo
          </button>
        </div>
        <div
          class="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 p-0 m-1 text-center"
        >
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild w-100"
            (click)="tipoSelected = 'producto'; filtro('')"
            [class]="{ active: tipoSelected == 'producto' }"
          >
            Productos
          </button>
        </div>
        <div
          class="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 p-0 m-1 text-start"
        >
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild w-100"
            (click)="tipoSelected = 'servicio'; filtro('')"
            [class]="{ active: tipoSelected == 'servicio' }"
          >
            Servicios
          </button>
        </div>
        <div
          class="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 p-0 m-1 text-start"
        >
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild w-100"
            (click)="propios = !propios; filtro('')"
            [class]="{ active: propios }"
          >
            Mis pedidos
          </button>
        </div>
        <div
          class="dropdown col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 p-0 m-1 text-start"
          *ngIf="deporteSelected == ''"
        >
          <a
            class="btn btn-sm btn-outline-primary dropdown-toggle fondo-btn-fild w-100"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Deporte
          </a>
          <ul class="dropdown-menu">
            <li>
              <a
                class="dropdown-item"
                (click)="deporteSelected = 'Atletismo'; filtro('')"
                style="cursor:pointer"
                >Atletismo</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                (click)="deporteSelected = 'Ciclismo'; filtro('')"
                style="cursor:pointer"
                >Ciclismo</a
              >
            </li>
          </ul>
        </div>
        <div
          class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2 text-start m-1"
          *ngIf="deporteSelected != ''"
        >
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild"
            (click)="deporteSelected = ''; filtro('')"
          >
            <span class="badge text-bg-primary">X</span> {{ deporteSelected }}
          </button>
        </div>
      </div>
      <div class="row-col-12 ps-4 pt-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/list-productos-servicios">Productos y servicios</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ filtroVista }}
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div
      id="contenido-panel"
      class="cuerpo pt-3 h-75 ps-4 pe-4"
      style="overflow: auto; max-height:53vh;"
    >
      <app-card-productos-servicios
        *ngFor="let datos of listaProductosServicios"
        [producto_servicio]="datos"
        [usuario]="true"
        [filtro_actual]="filtro_actual"
      ></app-card-productos-servicios>
      <div class="row-col-12 text-center pt-5" *ngIf="sinProductoServicios">
        <span class="color-letra-gray-900 small">{{
          sinProductoServiciosMsg
        }}</span>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [
    `
      .cuerpo {
        background-color: transparent;
      }

      .fondo-btn-fild {
        background-color: #ebe5fc;
        border: 0px;
        color: #7749f8;
      }
      .fondo-btn-fild:hover,
      .fondo-btn-fild.active {
        background-color: #7749f8;
        color: #fff;
      }
    `,
  ],
})
export class ProductosServiciosUsuarioComponent {
  listaProductosServicios: Array<ProductoServicioLista> = [];
  isError: boolean = false;
  error: string = '';
  sinProductoServicios: boolean = false;
  sinProductoServiciosMsg: string = '';
  tipoSelected: string = 'todo';
  deporteSelected: string = '';
  filtroVista: string = 'Sin filtro';
  propios: boolean = false;
  filtro_actual: string = '';

  openRegistrar() {
    if (this.sociosService.loggedIn()) {
      this.router.navigate(['/registrar-productos-servicios']);
    }
  }

  getProductosServicios(filtro: string) {
    this.sinProductoServicios = false;
    this.productosServiciosService
      .getListaProductosServiciosUsuario(filtro)
      .subscribe(
        (info) => {
          this.listaProductosServicios = info;

          if (this.listaProductosServicios.length == 0) {
            this.sinProductoServicios = true;
            this.sinProductoServiciosMsg =
              'Sin productos y servicios registrados';
            if (filtro != '') {
              this.sinProductoServiciosMsg =
                'Sin productos y servicios registrados con el filtro seleccionado.';
            }
          }
        },
        (err) => {
          if (err.code != 400) {
            this.isError = true;
            this.error = err.message;
          } else {
            this.sinProductoServicios = true;
            this.sinProductoServiciosMsg =
              'Sin productos y servicios registrados';
            if (filtro != '') {
              this.sinProductoServiciosMsg =
                'Sin productos y servicios registrados con el filtro seleccionado.';
            }
          }
        }
      );
  }

  filtro(tipo: string) {
    if (tipo == 'clear') {
      this.deporteSelected = '';
      this.getProductosServicios('');
      this.filtroVista = 'Sin filtro';
      this.propios = false;
      this.filtro_actual = '';

      return;
    }

    let tag = '';

    if (this.tipoSelected == 'todo' && this.deporteSelected != '') {
      tag = 'producto|servicio|' + this.deporteSelected;
    } else {
      tag += this.tipoSelected;
      tag += '|' + this.deporteSelected;
    }

    if (this.propios) {
      if (tag != '' && tag[tag.length - 1] != '|') {
        tag += '|';
      }
      tag += 'propios';
    }

    if (tag[0] == '|') {
      tag = tag.substring(1, tag.length);
    }
    if (tag[tag.length - 1] == '|') {
      tag = tag.substring(0, tag.length - 1);
    }

    this.filtroVista = tag
      .replaceAll('producto|servicio|', '')
      .replaceAll('servicio|producto|', '')
      .replaceAll('|', ', ')
      .replaceAll('producto', 'Productos')
      .replaceAll('propios', 'Mis pedidos')
      .replaceAll('todo,', '')
      .replaceAll('servicio', 'Servicios');

    if (tag != '') {
      this.getProductosServicios(tag);
    }
    this.filtro_actual = tag;
  }

  marcarTag() {
    if (this.filtro_actual == "") {
      this.tipoSelected = "todo";
      this.filtroVista = 'Sin filtro';
      return
    }

    if (this.filtro_actual.indexOf("propios") >= 0) {
      this.propios = true;
    }
    if (this.filtro_actual.indexOf("Atletismo") >= 0) {
      this.deporteSelected = "Atletismo";
    }
    if (this.filtro_actual.indexOf("Ciclismo") >= 0) {
      this.deporteSelected = "Ciclismo";
    }
    if (this.filtro_actual.indexOf("producto") >= 0 && this.filtro_actual.indexOf("servicio") < 0) {
      this.tipoSelected = "producto";
    }
    if (this.filtro_actual.indexOf("servicio") >= 0 && this.filtro_actual.indexOf("producto") < 0) {
      this.tipoSelected = "servicio";
    }

    this.filtroVista = this.filtro_actual
    .replaceAll('producto|servicio|', '')
    .replaceAll('servicio|producto|', '')
    .replaceAll('|', ', ')
    .replaceAll('producto', 'Productos')
    .replaceAll('propios', 'Mis pedidos')
    .replaceAll('todo,', '')
    .replaceAll('servicio', 'Servicios');
  }

  ngOnInit(): void {
    this.filtro_actual = this.productosServiciosService.getFiltro() ?? '';
    this.getProductosServicios(this.filtro_actual);
    this.marcarTag();
  }

  constructor(
    private router: Router,
    private sociosService: SociosService,
    private productosServiciosService: ProductosServiciosService
  ) {}
}
