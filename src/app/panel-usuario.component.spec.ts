import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelUsuarioComponent } from './panel-usuario.component';

describe('PanelUsuarioComponent', () => {
  let component: PanelUsuarioComponent;
  let fixture: ComponentFixture<PanelUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
