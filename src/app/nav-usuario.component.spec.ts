import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavUsuarioComponent } from './nav-usuario.component';

describe('NavUsuarioComponent', () => {
  let component: NavUsuarioComponent;
  let fixture: ComponentFixture<NavUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
