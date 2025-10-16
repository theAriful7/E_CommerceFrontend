import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-navbar',
  templateUrl: './vendor-navbar.component.html',
  styleUrls: ['./vendor-navbar.component.css']
})
export class VendorNavbarComponent {
 isCollapsed = false;
  showProfileMenu = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    alert('Logout successful!');
    // এখানে তুমি পরে authService ব্যবহার করে logout logic implement করতে পারবে
  }
}
