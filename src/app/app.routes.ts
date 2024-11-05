import { Routes } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

export const routes: Routes = [
  {
    path: 'customers',
    component: CustomersListComponent,
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent,
  },
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full',
  },
];
