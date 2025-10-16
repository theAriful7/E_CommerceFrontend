import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { UserRequest } from 'src/app/models/user-request.model';
import { Role, UserResponse } from 'src/app/models/user.mode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{

  form!: FormGroup;
  isEdit = false;
  userId!: number;

  roles = Object.values(Role); // dropdown e use korte

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: [''], // optional
      role: [Role.USER, Validators.required],
      addresses: this.fb.array([])  // FormArray for multiple addresses
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.userId = +idParam;
      this.loadUser(this.userId);
    }
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  addAddress(address?: Address) {
    this.addresses.push(
      this.fb.group({
        street: [address?.street || '', Validators.required],
        city: [address?.city || '', Validators.required],
        state: [address?.state || '', Validators.required],
        country: [address?.country || '', Validators.required],
        postalCode: [address?.postalCode || '', Validators.required]
      })
    );
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  loadUser(id: number) {
    this.userService.getUserById(id).subscribe(user => {
      this.form.patchValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role
      });

      // load addresses
      if (user.addresses?.length) {
        user.addresses.forEach(addr => this.addAddress(addr));
      } else {
        this.addAddress(); // empty row if none
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: UserRequest = {
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      phone: this.form.value.phone,
      password: this.form.value.password ? this.form.value.password : undefined,
      role: this.form.value.role,
      addresses: this.form.value.addresses
    };

    if (this.isEdit && this.userId) {
      this.userService.updateUser(this.userId, payload).subscribe({
        next: () => {
          alert('User updated');
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error(err);
          alert('Update failed');
        }
      });
    } else {
      this.userService.createUser(payload).subscribe({
        next: () => {
          alert('User created');
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error(err);
          alert('Create failed');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
