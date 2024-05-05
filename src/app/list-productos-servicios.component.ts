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
    CommonModule
  ],
  template: `
    <div class="container-fluid p-0 brand-hover">
      <app-nav-socios></app-nav-socios>
    </div>
    <div id="id-base-socio" class="container-fluit"></div>
    <div class="ps-4 pe-4 pt-3">
      <div class="row-col-12 text-start">
        <button
          type="button"
          class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild"
        >
          Todo
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild"
        >
          Productos
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild"
        >
          Servicios
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-primary me-2 fondo-btn-fild"
        >
          Pedidos
        </button>
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
      <div class="row-col-12">
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
      <div class = "row-col-12 text-center pt-5" *ngIf="sinProductoServicios">
        <span class="color-letra-gray-900 small">Sin productos y servicios registrados</span>
      </div>
      <div  *ngIf="!sinProductoServicios" class="row-col-12 text-center listo-paginador">
        <nav aria-label="paginador">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
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
      }
      .fondo-btn-fild:hover {
        background-color: #7749f8;
      }
    `,
  ],
})
export class ListProductosServiciosComponent implements OnInit {
  listaProductosServicios: Array<ProductoServicioLista> = [];
  isError: boolean = false;
  error: string = '';
  sinProductoServicios: boolean = false;

  openRegistrar() {
    if (this.sociosService.loggedIn()) {
      this.router.navigate(['/registrar-productos-servicios']);
    }
  }

  getProductosServicios() {
    this.sinProductoServicios = false;
    this.productosServiciosService.getListaProductosServicios().subscribe(
      (info) => {
        this.listaProductosServicios = info;

        if(this.listaProductosServicios.length == 0){
          this.sinProductoServicios = true;
        }

        console.log(this.listaProductosServicios);
      },
      (err) => {
        if (err.code != 400) {
          this.isError = true;
          this.error = err.message;
        }else{
          this.sinProductoServicios = true;
        }
      }
    );
  }

  ngOnInit(): void {
    this.getProductosServicios();
  }

  constructor(
    private router: Router,
    private sociosService: SociosService,
    private productosServiciosService: ProductosServiciosService
  ) {}
}
