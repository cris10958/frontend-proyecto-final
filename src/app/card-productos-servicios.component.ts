import { Component, Input, OnInit } from '@angular/core';
import {  ProductoServicioLista } from './productos-servicios.service';

@Component({
  selector: 'app-card-productos-servicios',
  standalone: true,
  imports: [],
  template: `
    <div class="row" (mouseenter)="hover = true" (mouseleave)="hover = false" [class]="{'brand-hover':hover}">
      <div class="col-3">
        <img src="./assets/img/prod-serv.png"  style="width: 15em;" alt="Porducto o servicios" />
      </div>
      <div class="col-9 p-4">
        <div class="row">
          <div class="col-12">
            <h6 class="color-letra-gray-800">
              Descripción: {{producto_servicio.descripcion}}
            </h6>
          </div>
          <div class="col-12">
            <h5 class="color-letra-gray-800">
            {{valorAjustado}}
            </h5>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Lugar disponibilidad: {{producto_servicio.pais}}, {{producto_servicio.ciudad}}
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Deporte: {{producto_servicio.deporte}}
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Tipo: {{tipo_ajustado}}
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Tipo de Producto / Servicio: {{producto_servicio.subtipo_servicio_producto}}
            </h6>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  .brand-hover{
  background-color: #EADDFF !important;
  cursor: pointer;
}
  `],
})
export class CardProductosServiciosComponent implements OnInit {
  hover:boolean = false;
  valorAjustado: string= '';
  tipo_ajustado:string = '';

  @Input() producto_servicio!: ProductoServicioLista;

  formatoValores() {
    const formatoPesos = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    });
    const valorFormato = formatoPesos.format(this.producto_servicio.valor ?? 0);
    this.valorAjustado = valorFormato;

    if(this.producto_servicio.tipo_servicio_producto == "producto"){
      this.tipo_ajustado = "Producto"
    }
    else if(this.producto_servicio.tipo_servicio_producto == "servicio"){
      this.tipo_ajustado = "Servicio"
    }
  }


  ngOnInit(): void {
    this.formatoValores();
  }

}
