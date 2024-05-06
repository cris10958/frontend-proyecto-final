import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ProductoServicioLista,
  ProductosServiciosService,
} from './productos-servicios.service';
import { DetalleProductosServiciosComponent } from './detalle-productos-servicios.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-productos-servicios',
  standalone: true,
  imports: [DetalleProductosServiciosComponent, CommonModule],
  template: `
    <div
      class="row"
      (mouseenter)="hover = true"
      (click)="openDetalle()"
      (mouseleave)="hover = false"
      [class]="{ 'brand-hover': hover }"
    >
      <div class="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 col-xxl-3">
        <img
          *ngIf="!sinImagen"
          [src]="'data:image/png;base64,' +fotoCard.foto"
          style="width: 15em;"
          alt="Porducto o servicios"
          class="p-3"
        />
        <img
          *ngIf="sinImagen"
          [src]="fotoCard.foto"
          style="width: 15em;"
          alt="Porducto o servicios"
          class="p-3"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-7 col-lg-9 col-xl-9 col-xxl-9 p-4">
        <div class="row">
          <div class="col-12">  
            <h6 class="color-letra-gray-800">
              Descripción: {{ producto_servicio.descripcion }}
            </h6>
          </div>
          <div class="col-12">
            <h5 class="color-letra-gray-800">
              {{ valorAjustado }}
            </h5>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
              Lugar disponibilidad: {{ producto_servicio.pais }},
              {{ producto_servicio.ciudad }}
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
              Deporte: {{ producto_servicio.deporte }}
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
              Tipo: {{ tipo_ajustado }}
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
              Tipo de Producto / Servicio:
              {{ producto_servicio.subtipo_servicio_producto }}
            </h6>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .brand-hover {
        background-color: #eaddff !important;
        cursor: pointer;
      }
    `,
  ],
})
export class CardProductosServiciosComponent implements OnInit {
  hover: boolean = false;
  valorAjustado: string = '';
  tipo_ajustado: string = '';
  fotoCard: any = {
    foto: '',
    orden: 0,
  };
  sinImagen:boolean=false;

  @Input() producto_servicio!: ProductoServicioLista;

  formatoValores() {
    const formatoPesos = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    });
    const valorFormato = formatoPesos.format(this.producto_servicio.valor ?? 0);
    this.valorAjustado = valorFormato;

    if (this.producto_servicio.tipo_servicio_producto == 'producto') {
      this.tipo_ajustado = 'Producto';
    } else if (this.producto_servicio.tipo_servicio_producto == 'servicio') {
      this.tipo_ajustado = 'Servicio';
    }
    this.fotoCard = this.producto_servicio.fotos.filter(
      (foto) => foto.orden == 1
    );
    if (this.fotoCard.length > 0) {
      this.fotoCard = this.fotoCard[0];
      this.sinImagen = false;
    }else{
      this.sinImagen = true;
      this.fotoCard = {
        foto: './assets/img/prod-serv.png',
        orden: 0,
      };
    }
  }

  openDetalle() {
    this.router.navigate([
      '/detalle_producto_servicio/' + this.producto_servicio.id,
    ]);
  }

  ngOnInit(): void {
    this.formatoValores();
  }

  constructor(private router: Router) {}
}
