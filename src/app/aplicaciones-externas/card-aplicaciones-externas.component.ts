import { Component, Input, OnInit } from '@angular/core';
import { ListAppExternas } from './aplicaciones-externas.service';
import moment from 'moment';

@Component({
  selector: 'app-card-aplicaciones-externas',
  standalone: true,
  imports: [],
  template: `
    <div class="fd-color p-4 shadow rounded contenedor-form tarjeta">
      <div class="row-col-12 text-start">
        <h1 class="small">Nombre</h1>
      </div>
      <div class="row-col-12 text-start pt-1">
        <label for="id-input-nombre-app-ext" class="form-label">{{
          detalle_app.nombre
        }}</label>
      </div>
      <div class="row pt-2">
        <div class="col-6 pt-2">
          <h1 class="small">Estado</h1>
        </div>
        <div class="col-6">
          <span
            class="badge badge-custom rounded-pill p-2 danger"
            [class]="{
              sucess: detalle_app.estado == 'Activa',
              danger: detalle_app.estado == 'Inactiva'
            }"
            >{{ detalle_app.estado }}
          </span>
        </div>
      </div>
      <div class="row-col-12 text-start pt-3">
        <h1 class="small">Última actualización</h1>
      </div>
      <div class="row-col-12 text-start">
        <label for="id-input-nombre-app-ext" class="form-label">{{
          ultima_actualizacion
        }}</label>
      </div>
    </div>
  `,
  styles: [`
    .tarjeta{
      cursor: pointer;
    }

    .tarjeta:hover{
      background-color: #E8DEF8;
    }
      
  `],
})
export class CardAplicacionesExternasComponent implements OnInit {
  ultima_actualizacion: string = '';
  @Input() detalle_app!: ListAppExternas;

  formatoValores() {
    const diaObjeto = moment.utc(`${this.detalle_app.fecha_modificacion}`);
    this.ultima_actualizacion = diaObjeto.format('DD/MM/YYYY hh:mm a');
  }

  ngOnInit(): void {
    this.formatoValores();
  }
}
