import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  Compra,
  ProductosServiciosService,
} from './productos-servicios.service';
import {} from 'stream';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-pago',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="row justify-content-center p-4 pb-5">
      <div class="col-11">
        <div class="row-col-12 text-center pt-4">
          <h1>Detalle del pago</h1>
        </div>
        <form class="row g-3" [formGroup]="detalle_pago">
          <div class="col-md-12 pt-2">
            <label for="id-direccion" class="form-label">Dirección</label>
            <input
              type="text"
              class="form-control fd-color white"
              id="id-direccion"
              formControlName="direccion"
              [class]="{
                'is-invalid':
                  detalle_pago.get('direccion')?.invalid &&
                  (detalle_pago.get('direccion')?.dirty ||
                    detalle_pago.get('direccion')?.touched)
              }"
              required
            />
            <div class="invalid-feedback">
              Por favor ingrese la dirección en donde desea que se le entregue
              el producto o se le preste el servicio
            </div>
          </div>
          <div class="col-md-12 pt-2">
            <label for="id-telefono" class="form-label">Teléfono</label>
            <input
              type="text"
              class="form-control fd-color white"
              id="id-telefono"
              formControlName="telefono"
              [class]="{
                'is-invalid':
                  detalle_pago.get('telefono')?.invalid &&
                  (detalle_pago.get('telefono')?.dirty ||
                    detalle_pago.get('telefono')?.touched)
              }"
              required
            />
            <div class="invalid-feedback">
              Por favor ingrese el teléfono al que nos podemos contactar
            </div>
          </div>

          <div class="col-12 pe-2">
            <label for="id-metodo-pago" class="form-label"
              >Método de pago</label
            >
            <select
              id="id-metodo-pago"
              class="form-select fd-color white"
              formControlName="metodo_pago"
              [class]="{
                'is-invalid':
                  detalle_pago.get('metodo_pago')?.invalid &&
                  (detalle_pago.get('metodo_pago')?.dirty ||
                    detalle_pago.get('metodo_pago')?.touched)
              }"
              required
            >
              <option value="" disabled>Seleccione uno</option>
              <option
                *ngFor="
                  let tipo of this.productosServiciosService.listaMetodoPago
                "
                [value]="tipo.key"
              >
                {{ tipo.value }}
              </option>
            </select>
            <div class="invalid-feedback">
              Por favor seleccione el método de pago
            </div>
          </div>
          <div class="row pt-4 pe-0">
            <div class="col-12">
              <label for="id-metodo-pago" class="form-label"
                >Fecha de entrega o prestación</label
              >
            </div>
            <div class="col-12 text-end pe-0">
              <h6 class="color-letra-on-primary-container">
                {{ fecha_formato }}
              </h6>
            </div>
          </div>
          <div class="row pt-4 pe-0">
            <div class="col-6">
              <label for="id-metodo-pago" class="form-label"
                >Valor a pagar</label
              >
            </div>
            <div class="col-6 text-end pe-0">
              <h6 class="color-letra-on-primary-container pe-0">
                {{ valor }}
              </h6>
            </div>
          </div>
          <div class="col-md-12 pt-2">
            <div class="invalido" *ngIf="isError">
              {{ error }}
            </div>
          </div>
          <div class="row p-0">
            <div class="col-6 text-end pe-0">
              <button
                class="btn btn-secondary"
                (click)="cancelar()"
                type="submit"
              >
                Cancelar
              </button>
            </div>
            <div class="col-6 text-start ps-4">
              <button
                class="btn btn-primary"
                [disabled]="!detalle_pago.valid || !fecha_valida"
                type="submit"
                (click)="confirmar()"
              >
                Comprar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: `
    
  `,
})
export class DetallePagoComponent {
  fecha_valida: boolean = true;
  isError: boolean = false;
  error: string = '';

  @Input() fecha!: string;
  @Input() id!: string;
  @Input() valor!: string;
  @Input() fecha_formato!: string;
  @Input() valor_sin_formato!: number;
  @Output() cierre = new EventEmitter<string>();

  detalle_pago = new FormGroup({
    direccion: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
    metodo_pago: new FormControl('', [Validators.required]),
  });

  confirmar() {
    if (this.detalle_pago.valid) {
      const detalle_pago_registro: Compra = {
        id_servicio_producto: this.id,
        fecha_servicio: this.fecha,
        direccion_servicio: this.detalle_pago.value.direccion ?? '',
        valor: this.valor_sin_formato ?? 0,
        telefono: this.detalle_pago.value.telefono ?? '',
        metodo_pago: this.detalle_pago.value.metodo_pago ?? '',
        estado_entrega: 'pendiente',
      };

      this.productosServiciosService.comprar(detalle_pago_registro).subscribe(
        (resp) => {
          this.toastr.success(
            'Compra exitosa',
            'Cada vez más cerda de tus objetivos'
          );
          this.isError = false;
          this.productosServiciosService.guardarFiltro('propios');
          this.router.navigate(['/productos-servicios-usuario']);
        },
        (err) => {
          this.isError = true;
          this.error = err.message;
        }
      );
    } else {
      this.isError = true;
      this.error = 'Por favor registre toda la información solicitada';
    }
  }

  cancelar() {
    this.cierre.emit('cierre');
  }

  constructor(
    readonly productosServiciosService: ProductosServiciosService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
