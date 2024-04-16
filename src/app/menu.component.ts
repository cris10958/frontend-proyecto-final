import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  template: `
  <div class="d-flex align-items-start row ps-2">
    <div class="nav flex-column nav-pills me-3 col-12 col-md-12 col-sm-12 col-lg-3 col-xl-3 col-xxl-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button class="nav-link active text-start" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Información basica</button>
      <button class="nav-link text-start" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Información alimenticia</button>
      <button class="nav-link text-start" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Información deportiva</button>
      <button class="nav-link text-start" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Sesión deportiva</button>
      <button class="nav-link text-start" id="v-pills-calendario-tab" data-bs-toggle="pill" data-bs-target="#v-pills-calendario" type="button" role="tab" aria-controls="v-pills-calendario" aria-selected="false">Calendario</button>
      <button class="nav-link text-start" id="v-pills-apss-ext-tab" data-bs-toggle="pill" data-bs-target="#v-pills-apss-ext" type="button" role="tab" aria-controls="v-pills-apss-ext" aria-selected="false">Integració apps externas</button>
    </div>
    <div class="tab-content col-12 col-md-12 col-sm-12 col-lg-8 col-xl-8 col-xxl-8" id="v-pills-tabContent">
      <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">Información basica</div>
      <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">Profile Content</div>
      <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">Información deportiva</div>
      <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabindex="0">Sesión deportiva</div>
      <div class="tab-pane fade" id="v-pills-calendario" role="tabpanel" aria-labelledby="v-pills-calendario-tab" tabindex="0">Calendario</div>
      <div class="tab-pane fade" id="v-pills-apss-ext" role="tabpanel" aria-labelledby="v-pills-apss-ext-tab" tabindex="0">Integració apps externas</div>
    </div>
  </div>
  `,
  styles: ``
})
export class MenuComponent {

}
