import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  roles = Object.values(Role);
  isEdit = false;
  userId?: number;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.userId = Number(idParam);
      this.loadUser(this.userId);
    }
  }

  initForm() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: [''], // optional on edit
      role: [Role.USER, Validators.required],
      addresses: this.fb.array([])
    });
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  addAddress(addr?: any) {
    this.addresses.push(this.fb.group({
      id: [addr?.id || null],
      street: [addr?.street || ''],
      city: [addr?.city || ''],
      state: [addr?.state || ''],
      country: [addr?.country || ''],
      postalCode: [addr?.postalCode || '']
    }));
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  loadUser(id: number) {
    this.loading = true;
    this.userService.getById(id).subscribe({
      next: (u: UserResponse) => {
        this.form.patchValue({
          fullName: u.fullName,
          email: u.email,
          phone: u.phone,
          role: u.role
        });
        // clear addresses and add from user
        while (this.addresses.length) this.addresses.removeAt(0);
        (u.addresses || []).forEach(a => this.addAddress(a));
        this.loading = false;
      },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  submit() {
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
      this.userService.update(this.userId, payload).subscribe({
        next: (res) => { alert('User updated'); this.router.navigate(['/users']); },
        error: (err) => { console.error(err); alert('Update failed'); }
      });
    } else {
      this.userService.create(payload).subscribe({
        next: (res) => { alert('User created'); this.router.navigate(['/users']); },
        error: (err) => { console.error(err); alert('Create failed'); }
      });
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }

}
