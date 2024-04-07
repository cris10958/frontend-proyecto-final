import { Component } from '@angular/core';

@Component({
  selector: 'app-planes-subscription',
  standalone: true,
  imports: [],
  template: `
    <div class="fd-color h-total w-100 row justify-content-center pb-5">
      <div class="col-10 pt-5">
        <div class="row-col-12 text-start">
          <a href="/home">
            <img src="./assets/icon/Brand.png" class="ico-brand-w" alt="logo">
          </a>
        </div>
        <div class="row-col-12 text-center pt-3 pb-3">
          <h1>Planes de subscripción</h1>
        </div>
        <div class="row justify-content-center pt-3 pb-3">
          <div class="col-4">
            <div class="fd-color white p-0 shadow rounded">
              <div class="fd-color primary_container rounded-top p-3 text-center">
                <h1>Gratis</h1>
              </div>
              <div class="rounded-bottom p-3 pb-3">
                <div class="col-10">
                  <ul>
                    <li>Hola 1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="fd-color white p-0 shadow rounded">
              <div class="fd-color primary_container rounded-top p-3 text-center">
                <h1>Intermedio</h1>
              </div>
              <div class="rounded-bottom p-3 pb-3">
                <div class="col-10">
                  <ul>
                    <li>Hola 1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="fd-color white p-0 shadow rounded">
              <div class="fd-color primary_container rounded-top p-3 text-center">
                <h1>Premium</h1>
              </div>
              <div class="rounded-bottom p-3 pb-3">
                <div class="col-10">
                  <ul>
                    <li>Hola 1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  `,
  styles: ``
})
export class PlanesSubscriptionComponent {

}
