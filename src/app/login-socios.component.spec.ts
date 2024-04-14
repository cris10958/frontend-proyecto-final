import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSociosComponent } from './login-socios.component';
import { HttpClientModule } from '@angular/common/http';


describe('LoginSociosComponent', () => {
  let component: LoginSociosComponent;
  let fixture: ComponentFixture<LoginSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSociosComponent,HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
