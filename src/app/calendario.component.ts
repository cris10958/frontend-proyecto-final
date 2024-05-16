import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DatosSesion, SesionService } from './sesion.service';
import { TarjetaDetalleSesionComponent } from './tarjeta-detalle-sesion.component';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, TarjetaDetalleSesionComponent],
  template: `
    <div class="row">
      <div class="col-6">
        <div class="fondo_calendario p-3 pt-4 rounded principal">
          <div class="row">
            <div class="col-2">
              <img
                src="./assets/icon/left.png"
                (click)="cambiarMes(-1)"
                width="8"
                alt="imagen_left"
              />
            </div>
            <div class="col-8">
              <h1>{{ disAjustado | date : 'MMMM, yyyy' }}</h1>
            </div>
            <div class="col-2">
              <img
                src="./assets/icon/right.png"
                (click)="cambiarMes(1)"
                width="8"
                alt="imagen_right"
              />
            </div>
          </div>
          <ol>
            <li class="color-letra-gray-800" *ngFor="let dia of semana">
              {{ dia | slice : 0 : 3 }}
            </li>
            <li
              (click)="seleccionarDia(dia)"
              [class]="{
                agendada: dia.estado == 'agendada',
                finalizada: dia.estado == 'finalizada'
              }"
              class="color-letra-gray-800"
              style="cursor:pointer;"
              [style.gridColumnStart]="first ? dia?.indexSemana : 'auto'"
              *ngFor="let dia of mesSeleccionado; let first = first"
            >
              {{ dia.valor }}
            </li>
          </ol>
        </div>
      </div>
      <div class="col-6">
            <div class="row"  *ngFor="let item of agendaSeleccionada">
            <div class="col-12" *ngIf="item !== undefined" >
            <app-tarjeta-detalle-sesion [datos]="item"></app-tarjeta-detalle-sesion>  
            </div>
            </div>
      </div>
    </div>
  `,
  styles: [
    `
      :root {
        --first-day-start: 5;
      }
      div.principal {
        text-align: center;
        height:250px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }

      ol {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        margin: 0;
        padding: 0;
      }

      li {
        font-size: 1.5ch;
      }

      h2 {
        margin-bottom: 4px;
        padding: 0;
      }

      .first-day {
        grid-column-start: var(--first-day-start, 0);
      }

      .day-name {
        background: #eee;
        font-weight: bold;
        font-size: 12px;
        margin-bottom: 2px;
        padding: 4px;
        text-align: center;
      }
    `,
  ],
})
export class CalendarioComponent implements OnInit {
  semana: any = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];

  mesSeleccionado: any = [];
  disSeccionado: any;
  disAjustado: any;
  isError: boolean = false;
  error: string = '';
  sesiones_agendadas: DatosSesion[] = [];
  fecha_sesion: any;
  agendaSeleccionada:any;

  obtenerDias(mes: number, anio: number) {
    const fecha_inicio = moment.utc(`${anio}/${mes}/01`);
    const fecha_fin = fecha_inicio.clone().endOf('month');
    this.disAjustado = fecha_inicio.clone().add(1, 'month');
    this.disSeccionado = fecha_inicio;
    const diferencia_dias = fecha_fin.diff(fecha_inicio, 'day', true);
    const numero_dias = Math.round(diferencia_dias);
    const lista_Dias = Object.keys([...Array(numero_dias)]).map((a: any) => {
      a = parseInt(a) + 1;
      let estado = null;
      const diaObjeto = moment(`${anio}-${mes}-${a}`);
      this.fecha_sesion.forEach((s: any) => {
        if (s.fecha == diaObjeto.format('DD/MM/YYYY')) {
          estado = s.estado;
        }
      });
      return {
        fecha: diaObjeto.format('DD/MM/YYYY'),
        hora: diaObjeto.format('hh:mm:ss'),
        nombre: diaObjeto.format('dddd'),
        valor: a,
        indexSemana: diaObjeto.isoWeekday(),
        estado: estado,
      };
    });

    

    this.mesSeleccionado = lista_Dias;
  }

  formatearLista() {
    const fecha_sesion = this.sesiones_agendadas.map((a: any) => {
      const diaObjeto = moment(`${a.fecha_sesion}`);
      return {
        fecha: diaObjeto.format('DD/MM/YYYY'),
        hora: diaObjeto.format('hh:mm:ss'),
        nombre: diaObjeto.format('dddd'),
        estado: a.estado,
      };
    });
    this.fecha_sesion = fecha_sesion;

    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;
    this.obtenerDias(mesActual, añoActual);
  }

  cambiarMes(direccion: any) {
    if (direccion < 0) {
      const Anterior = this.disSeccionado.clone().subtract(1, 'month');
      this.obtenerDias(Anterior.format('MM'), Anterior.format('YYYY'));
    } else {
      const Siguiente = this.disSeccionado.clone().add(1, 'month');
      this.obtenerDias(Siguiente.format('MM'), Siguiente.format('YYYY'));
    }
  }

  seleccionarDia(dia: any) {
    const MesAnio = this.disSeccionado.format('YYYY-MM');
    const parse = `${MesAnio}-${dia.valor}`;
    const ObjectFecha = moment(parse);

    const sesionAgendada = this.fecha_sesion.map((a: any) => {
      if(a.fecha == ObjectFecha.format('DD/MM/YYYY')){
      return a
      }
    });

    this.agendaSeleccionada = sesionAgendada;
  }
  ngOnInit(): void {}

  getSesionesAgendadas() {
    this.sesionService.getDatosSesiones().subscribe(
      (info) => {
        this.sesiones_agendadas = info.result;
        this.formatearLista();
      },
      (err) => {
        if (err.code != 400) {
          this.isError = true;
          this.error = err.message;
        }
      }
    );
  }

  constructor(private sesionService: SesionService) {}
}
