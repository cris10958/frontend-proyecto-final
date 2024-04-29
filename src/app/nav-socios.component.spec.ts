import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSociosComponent } from './nav-socios.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('NavSociosComponent', () => {
  let component: NavSociosComponent;
  let fixture: ComponentFixture<NavSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavSociosComponent, RouterModule.forRoot([]),HttpClientModule]
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
