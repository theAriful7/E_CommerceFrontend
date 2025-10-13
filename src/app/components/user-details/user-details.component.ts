import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user.mode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
 user?: UserResponse;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.fetch(id);
  }

  fetch(id: number) {
    this.loading = true;
    this.userService.getById(id).subscribe({
      next: (u) => { this.user = u; this.loading = false; },
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  back() {
    this.router.navigate(['/users']);
  }

  edit() {
    if (this.user) this.router.navigate(['/users/edit', this.user.id]);
  }
}
