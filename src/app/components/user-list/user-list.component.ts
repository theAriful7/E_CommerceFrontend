import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user.mode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserResponse[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUser();
  }

  fetchUser() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => { this.users = data; this.loading = false },
      error: (err) => { this.error = 'User fetch Failed'; this.loading = false },
    });
  }

  viewUser(id: number){
    this.router.navigate(['/users', id]);
  }

  editUser(id: number){
    this.router.navigate(['/users/edit', id]);
  }

    deleteUser(id: number) {
    if (!confirm('Are you sure to delete this user?')) return;
    this.userService.deleteUser(id).subscribe({
      next: () => { this.users = this.users.filter(u => u.id !== id); },
      error: (err) => { alert('Delete failed'); console.error(err); }
    });
  }

  addUser() {
    this.router.navigate(['/users/create']);
  }

}
