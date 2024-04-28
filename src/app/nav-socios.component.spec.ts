import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSociosComponent } from './nav-socios.component';

describe('NavSociosComponent', () => {
  let component: NavSociosComponent;
  let fixture: ComponentFixture<NavSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavSociosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
