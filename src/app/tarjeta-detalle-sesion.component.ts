import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { SesionService } from './sesion.service';
import { CommonModule } from '@angular/common';
import { EventosService } from './eventos-usuario/eventos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-detalle-sesion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <div class="col-3">
        <img
          src="./assets/img/prod-serv.png"
          style="width: 5em;"
          alt="Porducto o servicios"
        />
      </div>
      <div class="col-9 p-4 pt-0">
        <div class="row">
          <div class="col-6">
            <h6 class="color-letra-gray-800 small">
              {{ datos.nombre_agenda }}
            </h6>
          </div>
          <div class="col-6" *ngIf="!agendar">
            <span
              class="badge rounded-pill badge-custom"
              [class]="{ sucess: datos.estado == 'finalizada' }"
            >
              {{ estado_ajustado }}</span
            >
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-800 tx-justify">
              {{ datos.descripcion }}
            </h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-800">Fecha: {{ datos.fecha }}</h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-800">Hora: {{ datos.hora }}</h6>
          </div>
          <div class="col-12">
            <h6 class="small color-letra-gray-800">Lugar: País / Colombia</h6>
          </div>
          <div class="col-12" *ngIf="agendar">
            <a class="btn btn-primary" (click)="registro(datos.id??'')" >Agendar</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class TarjetaDetalleSesionComponent implements OnInit {
  estado_ajustado: string = '';
  @Input() datos: any;
  @Input() agendar!: boolean;
  @Output() actualizar_listar = new EventEmitter<string>();


  ajustar_estado() {
    if (this.datos.estado == 'agendada') {
      this.estado_ajustado = 'Agendada';
    } else if (this.datos.estado == 'finalizada') {
      this.estado_ajustado = 'Finalizada';
    } else {
      this.estado_ajustado = this.datos.estado;
    }
  }

  registro(id:string){
    this.eventosService
      .registrarEvento(id)
      .subscribe(
        (resp) => {
          this.toastr.success('Registro exitoso', 'Cada vez más cerda de tus objetivos');
          this.actualizar_listar.emit('');
        },
        (err) => {
          this.toastr.success('Algo salio mal', err);
        }
      );
  }

  ngOnInit(): void {
    this.ajustar_estado();
  }
  constructor(private sesionService: SesionService, private eventosService:EventosService, private toastr: ToastrService) {}
}
