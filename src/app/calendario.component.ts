import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DatosSesion, SesionService, VistaSesion } from './sesion.service';
import { TarjetaDetalleSesionComponent } from './tarjeta-detalle-sesion.component';
import { Eventos, EventosService } from './eventos-usuario/eventos.service';

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
                evento_calendario: dia.estado == 'agenda',
                agendada: dia.estado == 'agendada',
                finalizada: dia.estado == 'finalizada'
              }"
              class="color-letra-gray-800 p-2"
              style="cursor:pointer;"
              [style.gridColumnStart]="first ? dia?.indexSemana : 'auto'"
              *ngFor="let dia of mesSeleccionado; let first = first"
            >
              {{ dia.valor }}
            </li>
          </ol>
        </div>
        <div class="row text-start pt-3">
          <div class="col-1">
              <span class="badge rounded-pill text-bg-primary fd-color on_primary_fixed_variant color-letra-primary_fixed_variant">.</span>
          </div>
          <div class="col-5">
              <span>Agenda registrada</span>
          </div>
          <div class="col-1">
              <span class="badge rounded-pill text-bg-primary evento_calendario_icono">.</span>
          </div>
          <div class="col-5">
              <span>Próximos eventos</span>
          </div>
        </div>

      </div>
      <div class="col-6">
        <div class="row-col-12 text-start pb-2">
          <h1>Agenda</h1>
        </div>
        <div class="row-col-12 text-start" *ngIf="sin_agenda">
          <span class="color-letra-gray-800 small">
            Sin agenda registrada para el día seleccionado
          </span>
        </div>
        <div class="row-col-12" style="max-height: 50vh; overflow: auto;">
          <div class="row" style="" *ngFor="let item of agendaSeleccionada">
            <div class="col-12" *ngIf="item !== undefined && item.estado != 'agenda'">
              <app-tarjeta-detalle-sesion [agendar]="false"
                [datos]="item"
              ></app-tarjeta-detalle-sesion>
            </div>
          </div>
        </div>
        <div class="row-col-12 text-start pb-2 pt-3">
          <h1>Próximos eventos</h1>
        </div>
        <div class="row-col-12 text-start" *ngIf="sin_eventos">
          <span class="color-letra-gray-800 small">
            Sin eventos registrados para el día seleccionado
          </span>
        </div>
        <div class="row-col-12" style="max-height: 50vh; overflow: auto;" tabindex="0">
          <div class="row" style="" *ngFor="let item of lista_eventos_seleccionados">
            <div class="col-12" *ngIf="item !== undefined">
              <app-tarjeta-detalle-sesion (actualizar_listar)="actualizar_listar($event)" [agendar]="true"
                [datos]="item"
              ></app-tarjeta-detalle-sesion>
            </div>
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
        height: 50vh;
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
  sesiones_incial: DatosSesion[] = [];
  sesiones_agendadas: VistaSesion[] = [];
  fecha_sesion: any;
  lista_total: any;
  agendaSeleccionada: any;
  lista_eventos_ajustada: any;
  lista_eventos_seleccionados: any;
  lista_eventos: Array<Eventos> = [];
  lista_eventos_registrados: Array<Eventos> = [];
  sin_agenda: boolean = true;
  sin_eventos: boolean = true;
  dia_seleccion:any ={
    valor:''
  }

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
        id:''
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
        nombre_agenda: a.nombre,
        descripcion: a.descripcion,
      };
    });

    let datos_sesion:any=[];
    let agregar:boolean = false;

    for(let i=0; i < fecha_sesion.length; i++){
      agregar = true;
      for(let j=0; j < datos_sesion.length; j++){
        if(fecha_sesion[i].fecha == datos_sesion[j].fecha && fecha_sesion[i].hora == datos_sesion[j].hora){
          agregar = false;
          if((fecha_sesion[i].estado == "agendada" || fecha_sesion[i].estado == "finalizada")){
            datos_sesion[j].estado = fecha_sesion[i].estado;
            continue;
          }
        }
      }

      if(agregar){
        datos_sesion.push(fecha_sesion[i]);
      }
    }

    this.fecha_sesion = datos_sesion;
    this.lista_total = fecha_sesion;

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
    this.dia_seleccion = dia;

    const sesionAgendada = this.lista_total.map((a: any) => {
      if (a.fecha == ObjectFecha.format('DD/MM/YYYY')) {
        return a;
      }
    });

    const proximosEventos = this.lista_eventos_ajustada.map((a: any) => {
      if (a.fecha == ObjectFecha.format('DD/MM/YYYY')) {
        return a;
      }
    });

    this.agendaSeleccionada = sesionAgendada;
    this.lista_eventos_seleccionados = proximosEventos;
    this.sin_agenda = true;
    this.sin_eventos = true;
    for (let i = 0; i < this.agendaSeleccionada.length; i++) {
      if (this.agendaSeleccionada[i] != undefined && this.agendaSeleccionada[i].estado != "agenda") {
        this.sin_agenda = false;
        break;
      }
    }
    for (let i = 0; i < this.lista_eventos_seleccionados.length; i++) {
      if (this.lista_eventos_seleccionados[i] != undefined) {
        this.sin_eventos = false;
        break;
      }
    }
  }
  ngOnInit(): void {}

  getSesionesAgendadas() {
    this.sesiones_agendadas =[];
    this.sesionService.getDatosSesiones().subscribe(
      (info) => {
        this.sesiones_incial = info.result;
        for (let i = 0; i < this.sesiones_incial.length; i++) {
          this.sesiones_agendadas.push({
            estado: this.sesiones_incial[i].estado,
            fecha_fin: '',
            fecha_inicio: '',
            fecha_sesion: this.sesiones_incial[i].fecha_sesion,
            ftp: this.sesiones_incial[i].ftp,
            id_plan_deportista: this.sesiones_incial[i].id_plan_deportista,
            vo2_max: this.sesiones_incial[i].vo2_max,
            descripcion: 'Sesión deportiva',
            nombre: 'Sesión ' + (i + 1),
          });
        }

        this.getEventosAgendados();
      },
      (err) => {
        if (err.code != 400) {
          this.isError = true;
          this.error = err.message;
        }
      }
    );
  }

  getEventosAgendados() {
    this.eventosService.getListaEventosRegistrados().subscribe(
      (info) => {
        this.lista_eventos_registrados = info;
        for (let i = 0; i < this.lista_eventos_registrados.length; i++) {
          this.sesiones_agendadas.push({
            estado: 'agendada',
            fecha_fin: '',
            fecha_inicio: '',
            fecha_sesion: this.lista_eventos_registrados[i].fecha,
            ftp: '',
            id_plan_deportista: '',
            vo2_max: '',
            descripcion: this.lista_eventos_registrados[i].descripcion,
            nombre: 'Evento: ' + this.lista_eventos_registrados[i].nombre,
          });
        }
        this.getProximosEventos();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProximosEventos() {
    this.eventosService.getListaEventos().subscribe(
      (info) => {
        this.lista_eventos = info;
        this.lista_eventos_ajustada = this.lista_eventos.map((a: any) => {
          const diaObjeto = moment(`${a.fecha}`);
          return {
            fecha: diaObjeto.format('DD/MM/YYYY'),
            hora: diaObjeto.format('hh:mm:ss'),
            nombre: diaObjeto.format('dddd'),
            estado: "",
            nombre_agenda: a.nombre,
            descripcion: a.descripcion,
            id:a.id
          };
        });

        for (let i = 0; i < this.lista_eventos.length; i++) {
          if(this.lista_eventos[i].registrado == "si"){
            continue
          }
          this.sesiones_agendadas.push({
            estado: 'agenda',
            fecha_fin: '',
            fecha_inicio: '',
            fecha_sesion: this.lista_eventos[i].fecha,
            ftp: '',
            id_plan_deportista: '',
            vo2_max: '',
            descripcion: this.lista_eventos[i].descripcion,
            nombre: 'Evento: ' + this.lista_eventos[i].nombre,
          });
        }
        this.formatearLista();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  actualizar_listar(dato:string){
    this.getSesionesAgendadas();
    setTimeout(()=>{
     this.seleccionarDia(this.dia_seleccion); 
    },500)
  }

  constructor(
    private sesionService: SesionService,
    private eventosService: EventosService
  ) {}
}
