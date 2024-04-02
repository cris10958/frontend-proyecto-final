import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent}
];
