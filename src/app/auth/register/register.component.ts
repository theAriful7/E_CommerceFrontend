import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/register-request.model';
import { UserResponse } from 'src/app/models/user.mode';
import { UserService } from 'src/app/services/user.service';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 registerData: RegisterRequest = { fullName: '', email: '', phone: '', password: '' };
  message = '';
  user: UserResponse | null = null;

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (!this.registerData.fullName || !this.registerData.email || !this.registerData.password) {
      this.message = 'Please fill all required fields';
      return;
    }

    this.userService.register(this.registerData).subscribe({
      next: (res) => {
        this.user = res;
        this.message = `User registered successfully! Welcome ${res.fullName}`;
        // Redirect to login after successful registration
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        console.error(err);
        this.message = 'Registration failed';
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
