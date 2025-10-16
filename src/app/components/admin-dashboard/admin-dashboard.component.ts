import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

interface DashboardMetrics {
  totalOrders: number;
  totalCustomers: number;
  totalVendors: number;
  totalRevenue: number;
}
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  dashboardMetrics: DashboardMetrics = {
    totalOrders: 0,
    totalCustomers: 0,
    totalVendors: 0,
    totalRevenue: 0
  };

  recentOrders: Order[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadRecentOrders();
  }

  // ---------------- Dashboard Metrics ---------------- //
  loadDashboard() {
    this.loading = true;
    this.adminService.getDashboardMetrics().subscribe({
      next: (metrics) => {
        this.dashboardMetrics = metrics;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard metrics:', err);
        this.errorMessage = 'Failed to load dashboard metrics';
        this.loading = false;
      }
    });
  }

  // ---------------- Recent Orders ---------------- //
  loadRecentOrders() {
    this.adminService.getRecentOrders().subscribe({
      next: (orders: Order[]) => this.recentOrders = orders,
      error: (err) => {
        console.error('Error loading recent orders:', err);
        this.errorMessage = 'Failed to load recent orders';
      }
    });
  }
}