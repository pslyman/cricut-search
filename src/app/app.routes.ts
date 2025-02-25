import { Routes } from '@angular/router';
import { SearchMachinesComponent } from './components/search-machines/search-machines.component';


export const routes: Routes = [
  { path: '', redirectTo: '/cutting-machines', pathMatch: 'full' },
  { path: 'cutting-machines', component: SearchMachinesComponent },
];
