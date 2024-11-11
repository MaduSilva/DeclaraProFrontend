import { Routes } from '@angular/router';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './service/auth/auth.guard';
import { LoginGuard } from './service/auth/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'customers',
    component: CustomersListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full',
  },
];
