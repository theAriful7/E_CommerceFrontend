import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { VendorAddProductComponent } from './components/vendor-add-product/vendor-add-product.component';
import { VendorLayoutComponent } from './components/vendor-layout/vendor-layout.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { VendorProductListComponent } from './components/vendor-product-list/vendor-product-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  {
    path: 'vendor',
    component: VendorLayoutComponent,
    children: [
      { path: 'dashboard', component: VendorDashboardComponent },
      { path: 'add-product', component: VendorAddProductComponent },
      { path: 'products', component: VendorProductListComponent },
    ]
  },

  { path: 'users', component: UserListComponent },
  { path: 'users/create', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: 'users/:id', component: UserDetailsComponent },

  { path: 'payments', component: PaymentListComponent },
  { path: 'payments/form', component: PaymentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
