import { Component } from '@angular/core';

@Component({
  selector: 'app-card-evento',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <img src="./assets/img/prod-serv.png" class="card-img-top" alt="Imagen Evento" />
      <div class="card-body">
        <h6 class="color-letra-gray-800">Nombre Evento</h6>
        <h6 class="small color-letra-gray-600 pb-3 tx-justify">
          Some quick example text to build on the card title and make up the bulk of the card's content.
          </h6>
        <a class="btn btn-primary">Registrarme</a>
      </div>
    </div>
  `,
  styles: ``,
})
export class CardEventoComponent {}
