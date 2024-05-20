import { Component, Input } from '@angular/core';
import { DetalleVenta } from './productos-servicios.service';

@Component({
  selector: 'app-detalle-venta',
  standalone: true,
  imports: [],
  template: `
    <div class="row fd-color p-4 shadow rounded pt-5">
      <div class="col-12 text-start">
        <h1 class="small">Comprador {{index + 1}}</h1>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Nombre</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-800">
          {{ datos_venta.deportista_nombre }}
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Identificación</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-800">
          {{ datos_venta.deportista_numero_identificacion }}
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Dirección</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-800">
          {{ datos_venta.servicio_producto_deportista_direccion_servicio }}
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Teléfono</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-800">
          {{ datos_venta.servicio_producto_deportista_telefono }}
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Metódo de pago</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-800">
          {{ datos_venta.servicio_producto_deportista_metodo_pago?.toUpperCase() }}
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Estado de pago</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-800">
          PAGO RECIBIDO
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Estado de entrega / prestación</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-800">
          {{ datos_venta.servicio_producto_deportista_estado_entrega?.toUpperCase() }}
        </h6>
      </div>
    </div>

  `,
  styles: ``
})
export class DetalleVentaComponent {
  @Input() datos_venta!: DetalleVenta;
  @Input() index!: number;
  
}