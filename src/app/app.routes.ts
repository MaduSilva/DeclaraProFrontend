import { Routes } from '@angular/router';
import { CustomersListComponent } from './pages/accountant/customers-list/customers-list.component';
import { CustomerDetailsComponent } from './pages/accountant/customer-details/customer-details.component';
import { CustomersDashboardComponent } from './pages/accountant/customers-dashboard/customers-dashboard.component';
import { AuthGuard } from './service/auth/auth.guard';
import { LoginGuard } from './service/auth/login.guard';
import { LoginCustomerComponent } from './pages/login/login-customer/login-customer.component';
import { LoginAdminComponent } from './pages/login/login-admin/login-admin.component';
import { ClientesDashboardComponent } from './pages/customer/dashboard/clientes-dashboard.component';
import { CalculatorComponent } from './pages/customer/calculator/calculator.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

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
    path: 'clientes-dashboard/calculadora',
    component: CalculatorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers',
    component: CustomersListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/dashboard',
    component: CustomersDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'politica-de-privacidade',
    component: PrivacyPolicyComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];
