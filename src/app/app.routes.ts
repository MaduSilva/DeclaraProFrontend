import { Routes } from '@angular/router';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { AuthGuard } from './service/auth/auth.guard';
import { LoginGuard } from './service/auth/login.guard';
import { LoginCustomerComponent } from './pages/login/login-customer/login-customer.component';
import { LoginAdminComponent } from './pages/login/login-admin/login-admin.component';
import { ClientesDashboardComponent } from './pages/clientes-dashboard/clientes-dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginAdminComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'login-cliente',
    component: LoginCustomerComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'clientes-dashboard',
    component: ClientesDashboardComponent,
    canActivate: [AuthGuard],
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
