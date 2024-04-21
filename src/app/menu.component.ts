import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  template: `
  <div class="d-flex align-items-start row ps-2 min-vh-100 fd-color text-nav">
    <div  class="nav flex-column nav-pills me-3 col-12 col-md-12 col-sm-12 col-lg-3 col-xl-3 col-xxl-3 ps-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <a class="nav-link text-nav text-nav md disabled" aria-current="page" href="#">Mi cuenta</a>
      <hr class="m-0 ms-2">
      <button class="nav-link active text-start text-nav ms-2" id="v-pills-inf-bs-tab" data-bs-toggle="pill" data-bs-target="#v-pills-inf-bs" type="button" role="tab" aria-controls="v-pills-inf-bs" aria-selected="true">Información basica</button>
      <button class="nav-link text-start text-nav ms-2" id="v-pills-inf-alm-tab" data-bs-toggle="pill" data-bs-target="#v-pills-inf-alm" type="button" role="tab" aria-controls="v-pills-inf-alm" aria-selected="false">Información alimenticia</button>
      <button class="nav-link text-start text-nav ms-2" id="v-pills-inf-depor-tab" data-bs-toggle="pill" data-bs-target="#v-pills-inf-depor" type="button" role="tab" aria-controls="v-pills-inf-depor" aria-selected="false">Información deportiva</button>
      <button class="nav-link text-start text-nav ms-2" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Mi plan</button>
      <a id="id-title-sesion" class="nav-link text-nav text-nav disabled pt-2" aria-current="page" href="#">Sesión deportiva</a>
      <hr class="m-0 ms-2">
      <button class="nav-link text-start text-nav ms-2" id="v-pills-calendario-tab" data-bs-toggle="pill" data-bs-target="#v-pills-calendario" type="button" role="tab" aria-controls="v-pills-calendario" aria-selected="false">Calendario</button>
      <button class="nav-link text-start text-nav ms-2" id="v-pills-apss-ext-tab" data-bs-toggle="pill" data-bs-target="#v-pills-apss-ext" type="button" role="tab" aria-controls="v-pills-apss-ext" aria-selected="false">Integració apps externas</button>
    </div>
    <div class="tab-content col-12 col-md-12 col-sm-12 col-lg-8 col-xl-8 col-xxl-8" id="v-pills-tabContent">
      <div class="tab-pane fade show active" id="v-pills-inf-bs" role="tabpanel" aria-labelledby="v-pills-inf-bs-tab" tabindex="0">Información basica</div>
      <div class="tab-pane fade" id="v-pills-inf-alm" role="tabpanel" aria-labelledby="v-pills-inf-alm-tab" tabindex="0">Profile Content</div>
      <div class="tab-pane fade" id="v-pills-inf-depor" role="tabpanel" aria-labelledby="v-pills-inf-depor-tab" tabindex="0">Información deportiva</div>
      <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabindex="0">Mi plan</div>
      <div class="tab-pane fade" id="v-pills-calendario" role="tabpanel" aria-labelledby="v-pills-calendario-tab" tabindex="0">Calendario</div>
      <div class="tab-pane fade" id="v-pills-apss-ext" role="tabpanel" aria-labelledby="v-pills-apss-ext-tab" tabindex="0">Integració apps externas</div>
    </div>
  </div>
  `,
  styles: [`
    .titulos-menu{
      
    }

  `]
})
export class MenuComponent {

}
