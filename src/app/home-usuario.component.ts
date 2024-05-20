import { Component, OnInit } from '@angular/core';
import { NavUsuarioComponent } from './nav-usuario.component';
import { Agenda, DatosSesion, SesionService } from './sesion.service';
import { error } from 'console';
import moment from 'moment';
import { Eventos, EventosService } from './eventos-usuario/eventos.service';
import { CommonModule } from '@angular/common';
import { ProductoServicioLista, ProductosServiciosService } from './productos-servicios.service';

@Component({
  selector: 'app-home-usuario',
  standalone: true,
  imports: [NavUsuarioComponent, CommonModule],
  template: `
    <div class="container-fluid p-0 brand-hover">
      <app-nav-usuario [selected]="'home'"></app-nav-usuario>
    </div>
    <div id="id-base-agenda" class="container-fluit"></div>
    <div class="p-3">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5 p-3">
          <div class="row-col-12 text-start pt-3 pb-1 ps-1">
            <h1>Agenda</h1>
          </div>
          <div
            class="row-col-12 text-start"
            *ngIf="lista_final == null || lista_final.length == 0"
          >
            <span class="color-letra-gray-800 small">
              Sin agenda registrada
            </span>
          </div>
          <div class="row-col-12" *ngFor="let item of lista_final">
            <div
              class="row-col-12 fd-color on_primary_fixed_variant rounded border-bottom"
            >
              <span class="color-letra-on_primary_fixed_variant ps-5 small">{{
                item.fecha_formato
              }}</span>
            </div>
            <div class="row p-4">
              <div class="col-2">
                <span
                  class="badge rounded-pill text-bg-primary fd-color on_primary_fixed_variant color-letra-primary_fixed_variant"
                  >.</span
                >
              </div>
              <div class="col-6">
                <span class="color-letra-gray-800 small">{{
                  item.tipo + ': ' + item.nombre
                }}</span>
              </div>
              <div class="col-4">
                <span class="badge rounded-pill badge-custom">
                  {{ item.estado }}
                </span>
              </div>
            </div>
          </div>
          <hr *ngIf="lista_final != null && lista_final.length != 0" />
          <div
            class="row-col-12 text-center"
            *ngIf="lista_final != null && lista_final.length > 0"
          >
            <a href="/panel-usuarios/calendario" class="link-ul p-1 pe-3 ps-3"
              >Ver todos</a
            >
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7 p-4">
          <div class="row">
            <div class="row-col-12 text-start pt-3 pb-3 ps-1">
              <h1>Productos Top</h1>
            </div>
            <div
              class="row-col-12 text-start"
              *ngIf="lista_final == null || lista_final.length == 0"
            >
              <span class="color-letra-gray-800 small">
                Sin productos registrados
              </span>
            </div>
            <div class="row text-start">
              <div class="col-5 ps-0 me-5" *ngFor="let item of listaProductosServicios">
                <div class="card" style="width: 18rem; height: 27.6rem; overflow: auto;">
                  <img [src]="'data:image/png;base64,'+item.foto" class="card-img-top" alt="imagen_producto" />
                  <div class="card-body">
                    <h6 class="color-letra-on-primary-container">{{item.tipo}}</h6>
                    <p class="color-letra-gray-800 small">
                     {{ item.descripcion }}
                    </p>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item color-letra-gray-800 small">Deporte: {{ item.deporte }}</li>
                    <li class="list-group-item color-letra-on-primary-containe small">Precio: {{ item.valor }}</li>
                  </ul>
                  <div class="card-body" style="height: 8vh; overflow: auto;">
                    <a href="/productos-servicios-usuario" class="link-ul p-1 pe-3 ps-0">Ver detalle</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      a:hover {
        background-color: #eaddff !important;
      }
    `,
  ],
})
export class HomeUsuarioComponent implements OnInit {
  // [class]="{ sucess: datos.estado == 'finalizada' }"
  sesiones_agendadas: DatosSesion[] = [];
  lista_eventos: Array<Eventos> = [];
  lista_agenda: Array<Agenda> = [];
  lista_final: Array<Agenda> = [];
  sinProductoServicios:boolean = false;
  listaProductosServicios: any = [];
  listaProductosInicial: Array<ProductoServicioLista> = [];

  formatearLista() {
    const lista_ordenada = this.lista_agenda.sort((x, y) => {
      if (new Date(x.fecha ?? '') > new Date(y.fecha ?? '')) {
        return 1;
      }

      if (new Date(x.fecha ?? '') < new Date(y.fecha ?? '')) {
        return -1;
      }

      return 0;
    });
    this.lista_final = lista_ordenada.slice(0, 3);
  }

  getSesionesAgendadas() {
    this.sesionService.getDatosSesiones().subscribe(
      (info) => {
        this.sesiones_agendadas = info.result;

        for (let i = 0; i < this.sesiones_agendadas.length; i++) {
          this.lista_agenda.push({
            tipo: 'Sesión',
            nombre: 'Sesion 1',
            estado: this.sesiones_agendadas[i].estado ?? '',
            fecha: this.sesiones_agendadas[i].fecha_sesion,
            fecha_formato: moment(
              `${this.sesiones_agendadas[i].fecha_sesion}`
            ).format('DD/MM/YYYY hh:mm'),
          });
        }

        this.formatearLista();
      },
      (err) => {
        if (err.code != 400) {
          console.log(err);
        }
      }
    );
  }

  getListaEventosAgenda() {
    this.eventosService.getListaEventosRegistrados().subscribe(
      (info) => {
        if (info) {
          this.lista_eventos = info;

          for (let i = 0; i < this.lista_eventos.length; i++) {
            this.lista_agenda.push({
              tipo: 'Evento',
              nombre: this.lista_eventos[i].nombre,
              estado: 'Agendada',
              fecha: this.lista_eventos[i].fecha,
              fecha_formato: moment(`${this.lista_eventos[i].fecha}`).format(
                'DD/MM/YYYY hh:mm'
              ),
            });
          }

          this.formatearLista();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  formatoValores() {
    const formatoPesos = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    });

    for(let i=0;i< this.listaProductosInicial.length; i++){
      let valorFormato = formatoPesos.format(this.listaProductosInicial[i].valor ?? 0);

      this.listaProductosServicios.push({
        tipo: this.listaProductosInicial[i].tipo_servicio_producto?.toUpperCase(),
        descripcion: this.listaProductosInicial[i].descripcion,
        deporte: this.listaProductosInicial[i].deporte,
        valor: valorFormato,
        foto: this.listaProductosInicial[i].fotos[0].foto,
      }
      )
    }
  }

  getProductosServicios() {
    this.sinProductoServicios = false;
    this.productosServiciosService
      .getListaProductosServiciosUsuario('')
      .subscribe(
        (info) => {

          if (info == null || info.length == 0) {
            this.sinProductoServicios = true;
          }

          if(info){
            const lista_ordenada = info.sort((x:any, y:any) => {
              if (x.servicio_producto_vendidos > y.servicio_producto_vendidos) {
                return 1;
              }
        
              if (x.servicio_producto_vendidos < x.servicio_producto_vendidos) {
                return -1;
              }
        
              return 0;
            });
            this.listaProductosInicial = lista_ordenada.slice(0, 2);
            this.formatoValores();
          }
          

        },
        (err) => {
          console.log(err);
        }
      );
  }

  ngOnInit(): void {
    this.getSesionesAgendadas();
    this.getListaEventosAgenda();
    this.getProductosServicios();
  }

  constructor(
    private sesionService: SesionService,
    private eventosService: EventosService,
    private productosServiciosService: ProductosServiciosService
  ) {}
}

function sortDate(a: string, b: string): number {
  return new Date(b).getTime() - new Date(a).getTime();
  // or return new Date(a).getTime() - new Date(b).getTime();
}
