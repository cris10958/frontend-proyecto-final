import { Component, Input, input } from '@angular/core';
import { SesionService } from './sesion.service';

@Component({
  selector: 'app-tarjeta-detalle-sesion',
  standalone: true,
  imports: [],
  template: `
    <div class="row">
      <div class="col-3">
        <img src="./assets/img/prod-serv.png"  style="width: 5em;" alt="Porducto o servicios" />
      </div>
      <div class="col-9 p-4">
        <div class="row">
          <div class="col-6">
          
            <h6 class="color-letra-gray-800 small">
              Sesion 1
            </h6>
          </div>
          <div class="col-6">
          <span class="badge rounded-pill text-bg-primary"> {{datos.estado}}</span>
         
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Descripción
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Fecha: {{datos.fecha}}
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Hora: {{datos.hora}}
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Lugar: País / Colombia
            </h6>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class TarjetaDetalleSesionComponent {

  @Input() datos: any;

  constructor(private sesionService:SesionService){}  
}
