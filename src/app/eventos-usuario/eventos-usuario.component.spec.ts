import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosUsuarioComponent } from './eventos-usuario.component';

describe('EventosUsuarioComponent', () => {
  let component: EventosUsuarioComponent;
  let fixture: ComponentFixture<EventosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
