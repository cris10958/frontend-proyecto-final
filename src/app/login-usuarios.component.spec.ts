import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUsuariosComponent } from './login-usuarios.component';
import { HttpClientModule } from '@angular/common/http';


describe('LoginUsuariosComponent', () => {
  let component: LoginUsuariosComponent;
  let fixture: ComponentFixture<LoginUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUsuariosComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
