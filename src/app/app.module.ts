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
    UserFormComponent
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
