import { Component, OnInit } from '@angular/core';
import { NavSociosComponent } from './nav-socios.component';
import { FooterComponent } from './footer.component';
import { CardProductosServiciosComponent } from './card-productos-servicios.component';
import { Router } from '@angular/router';
import { SociosService } from './socios.service';
import {
  ProductoServicio,
  ProductoServicioLista,
  ProductosServiciosService,
} from './productos-servicios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-productos-servicios',
  standalone: true,
  imports: [
    NavSociosComponent,
    FooterComponent,
    CardProductosServiciosComponent,
    CommonModule,
  ],
  template: `
    <div class="container-fluid p-0 brand-hover">
      <app-nav-socios></app-nav-socios>
    </div>
    <div id="id-base-socio" class="container-fluit"></div>
    <div class="pe-4 pt-3">
      <div class="row text-start">
        <div class="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 p-0 text-end">
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild"
            (click)="tipoSelected = 'todo'; filtro('clear')"
            [class]="{
              active: tipoSelected == 'todo' && deporteSelected == ''
            }"
          >
            Todo
          </button>
        </div>
        <div class="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 p-0 text-center">
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild"
            (click)="tipoSelected = 'producto'; filtro('')"
            [class]="{ active: tipoSelected == 'producto' }"
          >
            Productos
          </button>
        </div>
        <div class="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 p-0 text-start">
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild"
            (click)="tipoSelected = 'servicio'; filtro('')"
            [class]="{ active: tipoSelected == 'servicio' }"
          >
            Servicios
          </button>
        </div>
        <div class="dropdown col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 p-0 text-start" *ngIf="deporteSelected == ''">
          <a
            class="btn btn-sm btn-outline-primary dropdown-toggle fondo-btn-fild"
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
        <div class="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2 col-xxl-2 text-start" *ngIf="deporteSelected != ''">
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild"
            (click)="deporteSelected = ''; filtro('')"
          >
            <span class="badge text-bg-primary">X</span> {{ deporteSelected }}
          </button>
        </div>
      </div>
      <div class="row-col-12 text-end">
        <button
          class="btn btn-sm btn-primary"
          (click)="openRegistrar()"
          type="submit"
        >
          Registrar nuevo
        </button>
      </div>
      <div class="row-col-12 ps-4">
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
export class ListProductosServiciosComponent implements OnInit {
  listaProductosServicios: Array<ProductoServicioLista> = [];
  isError: boolean = false;
  error: string = '';
  sinProductoServicios: boolean = false;
  sinProductoServiciosMsg: string = '';
  tipoSelected: string = 'todo';
  deporteSelected: string = '';
  filtroVista: string = 'Sin filtro';

  openRegistrar() {
    if (this.sociosService.loggedIn()) {
      this.router.navigate(['/registrar-productos-servicios']);
    }
  }

  getProductosServicios(filtro: string) {
    this.sinProductoServicios = false;
    this.productosServiciosService.getListaProductosServicios(filtro).subscribe(
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
      return;
    }

    let tag = '';

    if (this.tipoSelected == 'todo' && this.deporteSelected != '') {
      tag = 'producto|servicio|' + this.deporteSelected;
    } else {
      tag += this.tipoSelected;
      tag += '|' + this.deporteSelected;
    }

    if (tag[0] == '|') {
      tag = tag.substring(1, tag.length);
    }
    if (tag[tag.length - 1] == '|') {
      tag = tag.substring(0, tag.length - 1);
    }

    this.filtroVista = tag
      .replaceAll('producto|servicio|', '')
      .replaceAll('|', ', ')
      .replaceAll('producto', 'Productos')
      .replaceAll('servicio', 'Servicios');

    if (tag != '') {
      this.getProductosServicios(tag);
    }
  }

  ngOnInit(): void {
    this.getProductosServicios('');
  }

  constructor(
    private router: Router,
    private sociosService: SociosService,
    private productosServiciosService: ProductosServiciosService
  ) {}
}
