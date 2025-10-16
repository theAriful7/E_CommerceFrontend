import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request.model';
import { Role, UserResponse } from 'src/app/models/user.mode';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

interface StaticUser {
  email: string;
  password: string;
  role: 'ADMIN' | 'VENDOR' | 'CUSTOMER';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
 loginData: LoginRequest = { email: '', password: '' };
  user: UserResponse | null = null;
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Navigate to Register Page
  navigateToRegister() {
    this.router.navigate(['/register']);  // adjust route according to your routing
  }

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      this.message = 'Please enter email and password';
      this.user = null;
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        if (res) {
          this.user = res;
          this.message = `Welcome ${res.fullName} (${res.role})`;

          // ✅ Role-based redirect
          switch(res.role) {
            case Role.ADMIN:
              this.router.navigate(['/admin/dashboard']);
              break;
            case Role.VENDOR:
              this.router.navigate(['/vendor/dashboard']);
              break;
            case Role.CUSTOMER:
              this.router.navigate(['/customer/home']);
              break;
            default:
              this.router.navigate(['/']);
          }

        } else {
          this.message = 'Invalid email or password';
          this.user = null;
        }
      },
      error: () => {
        this.message = 'Login failed';
        this.user = null;
      }
    });
  }
}
