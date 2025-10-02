import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '../../../users/users.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
})
export class UserProfileComponent implements OnInit {
  user = signal<User | null>(null);
  error = signal<string | null>(null);

  constructor(private route: ActivatedRoute, private usersSvc: UsersService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const obs = Number.isFinite(id) ? this.usersSvc.findById(id) : this.usersSvc.me();
    obs.subscribe({
      next: (u) => this.user.set(u),
      error: (e) => {
        this.error.set('No se pudo cargar el usuario.');
        console.error(e);
      }
    });
  }
}
