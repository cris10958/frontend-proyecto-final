import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginSociosComponent } from './login-socios.component';
import { RegistroSocioComponent } from './registro-socio.component';
import { ListProductosServiciosComponent } from './list-productos-servicios.component';
import { LoginUsuariosComponent } from './login-usuarios.component';
import { RegistroUsuariosComponent } from './registro-usuarios.component';
import { PlanesSubscriptionComponent } from './planes-subscription.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path:'login-socios', component: LoginSociosComponent},
    {path:'registro-socios', component: RegistroSocioComponent},
    {path:'list-productos-servicios', component: ListProductosServiciosComponent},
    {path:'login-usuarios', component: LoginUsuariosComponent},
    {path:'registro-usuarios', component: RegistroUsuariosComponent},
    {path:'planes-subscripcion', component: PlanesSubscriptionComponent},
    
];
