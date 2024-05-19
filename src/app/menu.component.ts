import { AfterViewInit, Component, Inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormularioRegistroUsuarioComponent } from './formulario-registro-usuario.component';
import { FormularioInformacionAlimenticiaComponent } from './formulario-informacion-alimenticia.component';
import { FormularioInformacionDeportivaComponent } from './formulario-informacion-deportiva.component';
import { UsuarioService } from './usuario.service';
import { PlanSubscripcionActualComponent } from './plan-subscripcion-actual.component';
import { CalendarioComponent } from './calendario.component';
import { AplicacionesExternasComponent } from './aplicaciones-externas/aplicaciones-externas.component';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    FormularioRegistroUsuarioComponent,
    FormularioInformacionAlimenticiaComponent,
    FormularioInformacionDeportivaComponent,
    PlanSubscripcionActualComponent,
    CalendarioComponent,
    AplicacionesExternasComponent
  ],
  template: `
    <div
      class="d-flex align-items-start row ps-2 fd-color text-nav"
      style="height: 75vh;"
    >
      <div
        class="nav flex-column nav-pills col-12 col-md-12 col-sm-12 col-lg-3 col-xl-3 col-xxl-3 ps-2 pt-3"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <a
          class="nav-link text-nav text-nav md disabled"
          aria-current="page"
          href="#"
          >Mi cuenta</a
        >
        <!-- <hr tabindex="0" class="m-0 ms-2" /> -->
        <button
          class="nav-link active text-start text-nav ms-2"
          id="v-pills-inf-bs-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-inf-bs"
          type="button"
          role="tab"
          aria-controls="v-pills-inf-bs"
          aria-selected="true"
          (click)="cargarInformacionBasica()"
        >
          Información básica
        </button>
        <button
          class="nav-link text-start text-nav ms-2"
          id="v-pills-inf-alm-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-inf-alm"
          type="button"
          role="tab"
          aria-controls="v-pills-inf-alm"
          aria-selected="false"
          (click)="cargarInformacinAlimenticia()"
        >
          Información alimenticia
        </button>
        <button
          class="nav-link text-start text-nav ms-2"
          id="v-pills-inf-depor-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-inf-depor"
          type="button"
          role="tab"
          aria-controls="v-pills-inf-depor"
          aria-selected="false"
          (click)="cargarInformacionDeportiva()"
        >
          Información deportiva
        </button>
        <button
          class="nav-link text-start text-nav ms-2"
          id="v-pills-settings-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-settings"
          type="button"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
          (click)="cargarPlanes()"
        >
          Mi plan
        </button>
        <a
          id="id-title-sesion"
          class="nav-link text-nav text-nav disabled pt-2"
          aria-current="page"
          href="#"
          >Sesión deportiva</a
        >
        <!-- <hr tabindex="1" class="m-0 ms-2" /> -->
        <button
          class="nav-link text-start text-nav ms-2"
          id="v-pills-calendario-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-calendario"
          type="button"
          role="tab"
          aria-controls="v-pills-calendario"
          aria-selected="false"
          (click)="cargarCalendario()"
        >
          Calendario
        </button>
        <button
          class="nav-link text-start text-nav ms-2"
          id="v-pills-apss-ext-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-apss-ext"
          type="button"
          role="tab"
          aria-controls="v-pills-apss-ext"
          aria-selected="false"
          (click)="cargarAppExternas()"
        >
          Integración apps externas
        </button>
      </div>
      <div
        class="tab-content col-12 col-md-12 col-sm-12 col-lg-9 col-xl-9 col-xxl-9"
        style="max-height: 75vh; overflow:auto"
        id="v-pills-tabContent"
      >
        <div
          class="tab-pane fade show active "
          id="v-pills-inf-bs"
          role="tabpanel"
          aria-labelledby="v-pills-inf-bs-tab"
          tabindex="0"
        >
          <div class="row-col-12 ps-5 pt-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Mi perfil</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                  Información Básica
                </li>
              </ol>
            </nav>
          </div>

          <div class="row-col-12 text-center pt-3 pb-3">
            <h1>Información Básica</h1>
          </div>
          <div class="row pt-3 justify-content-center">
            <div class="col-10 pb-5">
              <app-formulario-registro-usuario
                [actualizacion]="true"
              ></app-formulario-registro-usuario>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="v-pills-inf-alm"
          role="tabpanel"
          aria-labelledby="v-pills-inf-alm-tab"
          tabindex="1"
        >
          <div class="row-col-12 ps-5 pt-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Mi perfil</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                  Información Alimenticia
                </li>
              </ol>
            </nav>
          </div>
          <div class="row-col-12 text-center pt-3 pb-3">
            <h1>Información Alimenticia</h1>
          </div>
          <div class="row pt-3 justify-content-center">
            <div class="col-10 pb-5">
              <app-formulario-informacion-alimenticia></app-formulario-informacion-alimenticia>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="v-pills-inf-depor"
          role="tabpanel"
          aria-labelledby="v-pills-inf-depor-tab"
          tabindex="2"
        >
          <div class="row-col-12 ps-5 pt-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Mi perfil</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                  Información deportiva
                </li>
              </ol>
            </nav>
          </div>
          <div class="row-col-12 text-center pt-3 pb-3">
            <h1>Información deportiva</h1>
          </div>
          <div class="row pt-3 justify-content-center">
            <div class="col-10 pb-5">
              <app-formulario-informacion-deportiva></app-formulario-informacion-deportiva>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="v-pills-settings"
          role="tabpanel"
          aria-labelledby="v-pills-settings-tab"
          tabindex="3"
        >
          <div class="row-col-12 ps-5 pt-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Mi perfil</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                  Mi plan
                </li>
              </ol>
            </nav>
          </div>
          <div class="row pt-3 justify-content-center">
            <div class="col-10 pb-5">
              <app-plan-subscripcion-actual></app-plan-subscripcion-actual>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="v-pills-calendario"
          role="tabpanel"
          aria-labelledby="v-pills-calendario-tab"
          tabindex="4"
        >
          <div class="row-col-12 ps-5 pt-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Mi perfil</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                  Calendario
                </li>
              </ol>
            </nav>
          </div>
          <div class="row pt-3 justify-content-center">
            <div class="col-10 pb-5">
              <app-calendario></app-calendario>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="v-pills-apss-ext"
          role="tabpanel"
          aria-labelledby="v-pills-apss-ext-tab"
          tabindex="5"
        >
        <div class="row justify-content-center">
            <div class="col-12 pb-5">
              <app-aplicaciones-externas></app-aplicaciones-externas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class MenuComponent implements  AfterViewInit {
  typeConsulta:string = "";

  @ViewChild(PlanSubscripcionActualComponent)
  childComponent!: PlanSubscripcionActualComponent;
  @ViewChild(FormularioInformacionAlimenticiaComponent)
  childFormPerfilAlimenticio!: FormularioInformacionAlimenticiaComponent;
  @ViewChild(FormularioInformacionDeportivaComponent)
  childFormPerfilDeportivo!: FormularioInformacionDeportivaComponent;
  @ViewChild(FormularioRegistroUsuarioComponent)
  childFormInfBasica!: FormularioRegistroUsuarioComponent;
  @ViewChild(CalendarioComponent) childFormCalendario!: CalendarioComponent;
  @ViewChild(AplicacionesExternasComponent) childAppExternas!: AplicacionesExternasComponent

  cargarPlanes() {
    this.childComponent.cargarPlanesActual();
  }
  cargarInformacinAlimenticia() {
    this.childFormPerfilAlimenticio.getInfoAlimenticia();
  }

  cargarInformacionDeportiva() {
    this.childFormPerfilDeportivo.getInfoDeportiva();
  }

  cargarInformacionBasica() {
    this.childFormInfBasica.getInfoBasica();
  }

  cargarCalendario() {
    this.childFormCalendario.getSesionesAgendadas();
  }

  cargarAppExternas(){
    this.childAppExternas.getAplicaciones();
  }

  ngAfterViewInit(): void {
    const id = this.activateRoute.params.subscribe((params) => {
      this.typeConsulta = params['type'];
      if(this.typeConsulta == "calendario"){
        const contenido = this.document.getElementById("v-pills-calendario-tab") as HTMLInputElement;
        if(contenido){
          contenido.click();
        }
      }
    });
  }

  

  constructor(private usuarioService: UsuarioService, private activateRoute: ActivatedRoute, @Inject(DOCUMENT) private document: Document,) {}
}
