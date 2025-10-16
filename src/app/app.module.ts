import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserComponent } from './components/user/user.component';
import { OrderComponent } from './components/order/order.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { AddressComponent } from './components/address/address.component';
import { CategoryComponent } from './components/category/category.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderItemListComponent } from './components/order-item-list/order-item-list.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartItemListComponent } from './components/cart-item-list/cart-item-list.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { VendorNavbarComponent } from './components/vendor-navbar/vendor-navbar.component';
import { VendorAddProductComponent } from './components/vendor-add-product/vendor-add-product.component';
import { VendorEditProductComponent } from './components/vendor-edit-product/vendor-edit-product.component';
import { VendorProductListComponent } from './components/vendor-product-list/vendor-product-list.component';
import { VendorLayoutComponent } from './components/vendor-layout/vendor-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    PaymentComponent,
    UserComponent,
    OrderComponent,
    OrderItemComponent,
    CartComponent,
    CartItemComponent,
    AddressComponent,
    CategoryComponent,
    UserListComponent,
    UserDetailsComponent,
    UserFormComponent,
    ProductListComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    CategoryListComponent,
    CategoryFormComponent,
    CategoryDetailsComponent,
    OrderListComponent,
    OrderFormComponent,
    OrderDetailsComponent,
    OrderItemListComponent,
    CartListComponent,
    CartItemListComponent,
    CartFormComponent,
    AddressListComponent,
    AddressFormComponent,
    PaymentListComponent,
    PaymentFormComponent,
    ReviewListComponent,
    ReviewFormComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    VendorDashboardComponent,
    CustomerDashboardComponent,
    VendorListComponent,
    VendorNavbarComponent,
    VendorAddProductComponent,
    VendorEditProductComponent,
    VendorProductListComponent,
    VendorLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
