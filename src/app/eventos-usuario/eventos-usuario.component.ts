import { Component } from '@angular/core';
import { CardEventoComponent } from './card-evento.component';
import { NavUsuarioComponent } from '../nav-usuario.component';

@Component({
  selector: 'app-eventos-usuario',
  standalone: true,
  imports: [CardEventoComponent, NavUsuarioComponent],
  template: `
    <div class="container-fluid p-0 brand-hover">
      <app-nav-usuario [selected]="'eventos'"></app-nav-usuario>
    </div>
    <div class="row-col-12 ps-4 pt-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/eventos" class="breadcrumb-item active">Eventos</a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="row-col-12 text-start ps-4 pt-3">
      <h1>Próximos eventos</h1>
    </div>
    <div class="row pt-2 ps-4 pe-4 pb-5">
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-4">
        <app-card-evento></app-card-evento>
      </div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-4">
        <app-card-evento></app-card-evento>
      </div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-4">
        <app-card-evento></app-card-evento>
      </div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-4">
        <app-card-evento></app-card-evento>
      </div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-4">
        <app-card-evento></app-card-evento>
      </div>
    </div>
  `,
  styles: ``,
})
export class EventosUsuarioComponent {}
