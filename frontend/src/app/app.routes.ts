import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NasaDataComponent } from './pages/nasa-data/nasa-data.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'NASA Pakistan Climate Dashboard' },
  { path: 'nasa-data', component: NasaDataComponent, title: 'Explore NASA Climate Data' },
  { path: '**', redirectTo: 'home' }
];
