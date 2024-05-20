import { Component, OnInit } from '@angular/core';
import { CardEventoComponent } from './card-evento.component';
import { NavUsuarioComponent } from '../nav-usuario.component';
import { Eventos, EventosService } from './eventos.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eventos-usuario',
  standalone: true,
  imports: [CardEventoComponent, NavUsuarioComponent, CommonModule],
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
      <div *ngFor="let item of lista_eventos" class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 pt-4">
        <app-card-evento [evento]="item" (actualizar)="getListaEventos()"></app-card-evento>
      </div>
    </div>
  `,
  styles: ``,
})

export class EventosUsuarioComponent implements OnInit{
  lista_eventos: Array<Eventos> = [];
  sin_eventos:boolean = false;

  getListaEventos(){
    this.sin_eventos = false;
    this.eventosService
      .getListaEventos()
      .subscribe(
        (info) => {
          if(info){
          this.lista_eventos = info;
        }else{
          this.sin_eventos = true;
        }
        },
        (err) => {
          console.log(err)
        }
      );
  }

  ngOnInit(): void {
    this.getListaEventos();
  }

  constructor(private eventosService:EventosService){}
}
