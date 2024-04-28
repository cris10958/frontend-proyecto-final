import { Component } from '@angular/core';

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
              Descripción: This is a wider card with supporting text below as a
              natural lead-in to additional content. This content is a little
              bit longer.
            </h6>
          </div>
          <div class="col-12">
            <h5 class="color-letra-gray-800">
                COP 501. 000  
            </h5>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Lugar disponibilidad: País, Ciudad
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Deporte: Atletismo
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Tipo: Producto
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-600">
            Tipo de Producto / Servicio: Acompañamiento Deportivo
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
export class CardProductosServiciosComponent {
  hover:boolean = false;

}
