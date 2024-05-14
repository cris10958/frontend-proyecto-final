import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { __values } from 'tslib';
import { PerfilDeportivo, PerfilamientoService } from './perfilamiento.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-informacion-deportiva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
      class="row g-3"
      [formGroup]="informacion_deportistas"
    >
      <div class="col-6">
        <label for="id-cantidad-dias" class="form-label"
          >Cantidad de días por semana que desea practicar</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-cantidad-dias"
          formControlName="dias_semana"
          [class]="{
            'is-invalid':
              informacion_deportistas.get('dias_semana')?.invalid &&
              (informacion_deportistas.get('dias_semana')?.dirty ||
                informacion_deportistas.get('dias_semana')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">
          Por favor ingrese la cantidad de días que desea practicar
        </div>
      </div>
      <div class="col-6">
        <label
          id="id-label-tiempo-semana"
          for="d-tiempo-semana"
          class="form-label"
          >Tiempo de practica (horas/semana)</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-tiempo-semana"
          formControlName="tiempo_practica"
          [class]="{
            'is-invalid':
              informacion_deportistas.get('tiempo_practica')?.invalid &&
              (informacion_deportistas.get('tiempo_practica')?.dirty ||
                informacion_deportistas.get('tiempo_practica')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">
          Por favor ingrese el tiempo que desea practicar durante la semana
        </div>
      </div>
      <div class="col-6 ps-2">
        <label id="id-label-vo2max" for="id-vo2max" class="form-label"
          >¿Cuál es tu VO2max actual?</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-vo2max"
          formControlName="VO2max"
          [class]="{
            'is-invalid':
              informacion_deportistas.get('VO2max')?.invalid &&
              (informacion_deportistas.get('VO2max')?.dirty ||
                informacion_deportistas.get('VO2max')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">Por favor ingresa el VO2max actual</div>
      </div>
      <div class="col-6 ps-2">
        <label id="id-label-ftp" for="id-ftp" class="form-label"
          >¿Cuál es tud FTP actual?</label
        >
        <input
          type="number"
          class="form-control fd-color white"
          id="id-ftp"
          formControlName="FTP_value"
          [class]="{
            'is-invalid':
              informacion_deportistas.get('FTP')?.invalid &&
              (informacion_deportistas.get('FTP')?.dirty ||
                informacion_deportistas.get('FTP')?.touched)
          }"
          required
        />
        <div class="invalid-feedback">Por favor ingresa el FTP actual</div>
      </div>
      <div class="col-6 ps-2">
        <label
          id="id-label-intolerancia"
          for="id-intolerancia-usuario"
          class="form-label"
          >¿Cuenta con alguna lesion, molestia o incapacidad?
        </label>
        <div class="row-col-12">
          <div class="form-check form-check-inline">
            <input
              id="inlineRadioSiDep"
              class="form-check-input"
              (click)="habilitar_molestia('1')"
              type="radio"
              name="inlineLesion"
              value="1"
              [checked]="lesion == '1'"
            />
            <label class="form-check-label" for="inlineRadioSiDep">Si</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              id="inlineRadioNo"
              class="form-check-input"
              (click)="habilitar_molestia('0')"
              type="radio"
              name="inlineLesion"
              value="0"
              [checked]="lesion == '0'"
            />
            <label class="form-check-label" for="inlineRadioNo">No</label>
          </div>
        </div>
      </div>
      <div class="col-6">
        <label
          id="id-label-detalle-lesion"
          for="id-molestias"
          class="form-label"
          >¿Cuál?</label
        >
        <input
          type="text"
          class="form-control fd-color white"
          id="id-molestias"
          formControlName="detalle_lesion"
          [class]="{
            'is-invalid':
              lesion == '1' &&
               (informacion_deportistas.get('detalle_lesion')?.invalid ||
               informacion_deportistas.value.detalle_lesion?.trim() == '') &&
              (informacion_deportistas.get('detalle_lesion')?.dirty ||
              informacion_deportistas.get('detalle_lesion')?.touched)
          }"
        />
        <div class="invalid-feedback">Por favor ingrese que molestica o lesión tiene</div>
      </div>
      <div class="col-md-12 pt-5 pb-2 text-center">
        <div class="invalido" *ngIf="isError">
          {{ error }}
        </div>
      </div>
      <div class="row p-0">
        <div class="col-6 text-end pe-0">
          <button class="btn btn-secondary" (click)="cancelar_boton = true; getInfoDeportiva()">
            Cancelar
          </button>
        </div>
        <div class="col-6 text-start ps-4">
          <button
            id="id-bt"
            class="btn btn-primary"
            type="submit"
            (click)=" cancelar_boton = false;registro()"
            [disabled]="
              !informacion_deportistas.valid ||
              informacion_deportistas.value.dias_semana == '0' ||
              informacion_deportistas.value.tiempo_practica == '0' ||
              informacion_deportistas.value.VO2max == '0' ||
              informacion_deportistas.value.FTP_value == '0' ||
              lesion == '' ||
              (lesion == '1' && informacion_deportistas.value.detalle_lesion?.trim() == '')
            "
          >
           Actualizar
          </button>
        </div>
      </div>
    </form>
  `,
  styles: ``,
})
export class FormularioInformacionDeportivaComponent implements OnInit{
  isError: boolean = false;
  error: string = '';
  lesion: string = '';
  perfil_registrado: boolean = false;
  cancelar_boton:boolean = false;

  informacion_deportistas = new FormGroup({
    dias_semana: new FormControl('', [
      Validators.required
    ]),
    tiempo_practica: new FormControl('', [
      Validators.required
    ]),
    VO2max: new FormControl('', [Validators.required]),
    FTP_value: new FormControl('', [Validators.required]),
    lesion: new FormControl(''),
    detalle_lesion: new FormControl('',[Validators.maxLength(50)]),
  });

  registro() {
    if (
      !(
        !this.informacion_deportistas.valid ||
              this.informacion_deportistas.value.dias_semana == '0' ||
              this.informacion_deportistas.value.tiempo_practica == '0' ||
              this.informacion_deportistas.value.VO2max == '0' ||
              this.informacion_deportistas.value.FTP_value == '0' ||
              this.lesion == '' ||
              (this.lesion == '1' && this.informacion_deportistas.value.detalle_lesion?.trim() == '')
        || this.cancelar_boton 
      )
    ) {
      const perfilDeportivoReg: PerfilDeportivo = {
        FTP_actual: this.informacion_deportistas.value.FTP_value??'0',                          
        VO2max_actual: this.informacion_deportistas.value.VO2max??'0', 
        detalle_lesion_molestia_incapacidad: this.informacion_deportistas.value.detalle_lesion??'NA',
        dias_semana_practica:this.informacion_deportistas.value.dias_semana??'0',
        lesion_molestia_incapacidad:  this.lesion == '1'?true:false,
        tiempo_practica: this.informacion_deportistas.value.tiempo_practica??'0'
      };
      if (!this.perfil_registrado) {
        this.perfilamientoService
          .addPerfilDeportivo(perfilDeportivoReg)
          .subscribe(
            (resp) => {
              this.toastr.success('Actualización exitosa', 'Tus planes serán más personalizados');
              this.perfil_registrado = true;
            this.isError = false;
            },
            (err) => {
              this.isError = true;
              this.error = err.message;
            }
          );
      }else{
        this.perfilamientoService
          .updPerfilDeportivo(perfilDeportivoReg)
          .subscribe(
            (resp) => {
              this.toastr.success('Actualización exitosa', 'Tus planes serán más personalizados');
            this.isError = false;
            },
            (err) => {
              this.isError = true;
              this.error = err.message;
            }
          );
      }
    }
  }

  habilitar_molestia(seleccion: string) {
    this.lesion = seleccion;
    this.informacion_deportistas.get('detalle_lesion')?.reset();
    this.informacion_deportistas.value.lesion = this.lesion;
    if (seleccion == '1') {
      this.informacion_deportistas.get('detalle_lesion')?.enable();
    } else {
      this.informacion_deportistas.get('detalle_lesion')?.disable();
    }
  }

  getInfoDeportiva() {
    this.perfilamientoService.getInfoDeportiva().subscribe(
      (info) => {
        let infoDeportiva = info;
        this.perfil_registrado = true;
        if(infoDeportiva.detalle_lesion_molestia_incapacidad == 'NA'){
          infoDeportiva.detalle_lesion_molestia_incapacidad ='';
        }
        this.informacion_deportistas = new FormGroup({
          dias_semana: new FormControl(infoDeportiva.dias_semana_practica, [
            Validators.required
          ]),
          tiempo_practica: new FormControl(infoDeportiva.tiempo_practica, [
            Validators.required
          ]),
          VO2max: new FormControl(infoDeportiva.VO2max_actual, [Validators.required]),
          FTP_value: new FormControl(infoDeportiva.FTP_actual, [Validators.required]),
          lesion: new FormControl(''),
          detalle_lesion: new FormControl(infoDeportiva.detalle_lesion_molestia_incapacidad,[Validators.maxLength(50)]),
        });
        if(infoDeportiva.lesion_molestia_incapacidad){
          this.lesion='1'
        }
        else{
          this.lesion='0'
        }
        this.isError = false;
      },
      (err) => {
        if (err.code != 400) {
          this.isError = true;
          this.error = err.message;
          this.perfil_registrado = false;
        }
      }
    );
  }

  ngOnInit(): void {
    this.informacion_deportistas.get('detalle_lesion')?.disable();
  }

  constructor(private perfilamientoService: PerfilamientoService,   private toastr: ToastrService){}
}
