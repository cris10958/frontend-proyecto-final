import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuariosComponent } from './registro-usuarios.component';
import { RouterModule } from '@angular/router';

describe('RegistroUsuariosComponent', () => {
  let component: RegistroUsuariosComponent;
  let fixture: ComponentFixture<RegistroUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUsuariosComponent, RouterModule.forRoot([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
