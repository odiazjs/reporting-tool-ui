import { Routes } from '@angular/router';

import {
    DashboardComponent
} from '../components/barrel';

export const appRoutes: Routes = [
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent }
];
