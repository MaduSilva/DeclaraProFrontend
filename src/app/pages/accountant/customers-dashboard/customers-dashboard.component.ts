import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'customers-dashboard',
  templateUrl: './customers-dashboard.component.html',
  styleUrls: ['./customers-dashboard.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class CustomersDashboardComponent {}
