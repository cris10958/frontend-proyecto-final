import { Component, Input, OnInit } from '@angular/core';
import { Eventos, EventosService } from './eventos.service';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-card-evento',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <img
        src="./assets/img/prod-serv.png"
        class="card-img-top"
        alt="Imagen Evento"
      />
      <div class="card-body">
        <h6 class="color-letra-gray-800">{{ evento.nombre }}</h6>
        <div class="col-12 h-description">
          <h6 class="small color-letra-gray-800 tx-justify">
          {{ evento.descripcion }}
          </h6>
        </div>
        <div class="col-12">
          <h6 class="small color-letra-gray-800">
            Deporte:
            {{ evento.deporte }}
          </h6>
        </div>
        <div class="col-12">
          <h6 class="small color-letra-gray-800">
            Fecha:
            {{ fecha }}
          </h6>
        </div>
        <div class="col-12">
          <h6 class="small color-letra-gray-800">
            Lugar:
             {{ evento.lugar }}
          </h6>
        </div>
        <div class="col-12 pb-4">
          <h6 class="small color-letra-gray-800">
            País:
             {{ evento.pais }}
          </h6>
        </div>
        <a class="btn btn-primary" (click)="registro(evento.id??'')" >Registrarme</a>
      </div>
    </div>
  `,
  styles: [`
    .h-description {
      height: 20vh;
      overflow: auto;
    }
  `],
})
export class CardEventoComponent implements OnInit {
  @Input() evento!: Eventos;
  fecha: string = "";

  formatos_datos(){
    const diaObjeto = moment.utc(
      `${this.evento.fecha}`
    );
    this.fecha = diaObjeto.format('DD/MM/YYYY hh:mm a');
  }

  registro(id:string){
    this.eventosService
      .registrarEvento(id)
      .subscribe(
        (resp) => {
          this.toastr.success('Registro exitoso', 'Cada vez más cerda de tus objetivos');
        },
        (err) => {
          this.toastr.success('Algo salio mal', err);
        }
      );
  }

  ngOnInit(): void {
      this.formatos_datos();
  }

  constructor(private eventosService:EventosService, private toastr: ToastrService){}
}
