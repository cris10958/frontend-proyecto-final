import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-venta',
  standalone: true,
  imports: [],
  template: `
    <div class="row fd-color p-4 shadow rounded pt-5">
      <div class="col-12 text-start">
        <h1 class="small">Comprador 1</h1>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Nombre</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-600">
          Juanito Perez
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Identificación</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-600">
          11111
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Dirección</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-600">
          Carrera Siempre Viva 123
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Teléfono</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-600">
          11111
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Metódo de pago</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-600">
          Tarjeta
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Estado de pago</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-600">
          Pago exitoso
        </h6>
      </div>
      <div class="col-12 text-start pt-3">
        <h1 class="small">Estado de entrega / prestación</h1>
      </div>
      <div class="col-12">
        <h6 class="small color-letra-gray-600">
          Pendiente
        </h6>
      </div>
    </div>

  `,
  styles: ``
})
export class DetalleVentaComponent {
}
