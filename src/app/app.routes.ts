import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginSociosComponent } from './login-socios.component';
import { RegistroSocioComponent } from './registro-socio.component';
import { ListProductosServiciosComponent } from './list-productos-servicios.component';
import { LoginUsuariosComponent } from './login-usuarios.component';
import { RegistroUsuariosComponent } from './registro-usuarios.component';
import { PlanesSubscriptionComponent } from './planes-subscription.component';
import { HomeUsuarioComponent } from './home-usuario.component';
import { MenuComponent } from './menu.component';
import { PanelUsuarioComponent } from './panel-usuario.component';
import { CardProductosServiciosComponent } from './card-productos-servicios.component';
import { FormularioRegistroProductoServicioComponent } from './formulario-registro-producto-servicio.component';
import { CalendarioComponent } from './calendario.component';
import { DetalleProductosServiciosComponent } from './detalle-productos-servicios.component';
import { ProductosServiciosUsuarioComponent } from './productos-servicios-usuario.component';
import { EventosUsuarioComponent } from './eventos-usuario/eventos-usuario.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path:'login-socios', component: LoginSociosComponent},
    {path:'registro-socios', component: RegistroSocioComponent},
    {path:'list-productos-servicios', component: ListProductosServiciosComponent},
    {path:'login-usuarios', component: LoginUsuariosComponent},
    {path:'registro-usuarios', component: RegistroUsuariosComponent},
    {path:'planes-subscripcion', component: PlanesSubscriptionComponent},
    {path:'home-usuario', component: HomeUsuarioComponent},
    {path:'panel-usuarios/:type', component: PanelUsuarioComponent},
    {path:'registrar-productos-servicios', component: FormularioRegistroProductoServicioComponent},
    {path:'detalle_producto_servicio/:id/:type', component: DetalleProductosServiciosComponent},
    {path:'productos-servicios-usuario', component: ProductosServiciosUsuarioComponent},
    {path:'eventos', component: EventosUsuarioComponent},
    
];
