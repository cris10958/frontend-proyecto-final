import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuariosComponent } from './registro-usuarios.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


describe('RegistroUsuariosComponent', () => {
  let component: RegistroUsuariosComponent;
  let fixture: ComponentFixture<RegistroUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUsuariosComponent, RouterModule.forRoot([]),HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render div with class fd-color h-total w-100 row justify-content-center pb-5', () => {
  //   const fixture = TestBed.createComponent(RegistroUsuariosComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('div')?.className).toContain('fd-color h-total w-100 row justify-content-center pb-5');
  // });

 

  

});
