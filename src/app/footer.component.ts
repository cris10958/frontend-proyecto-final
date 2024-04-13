import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-flex footer ps-0 pe-5 pt-1 pb-2">
      <div class="row">
        <div class="col-1 text-end">
          <img src="./assets/icon/Copyright.png" alt="Imagen Copyright">
        </div>
        <div id="id-text" class="col-11 text-start ps-0 small pt-1">
          LAAD.exe 2024
        </div>
      </div>
    </div>
  `,
  styles: [`

  `]
})
export class FooterComponent {

}
