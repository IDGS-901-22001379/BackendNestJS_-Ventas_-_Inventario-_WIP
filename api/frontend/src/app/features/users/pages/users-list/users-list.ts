import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService, User, Page } from '../../../users/users.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './users-list.html',
})
export class UsersListComponent implements OnInit {
  search = signal('');
  page = signal(1);
  pageSize = signal(10);
  total = signal(0);
  users = signal<User[]>([]);
  totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));

  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private usersSvc: UsersService) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.usersSvc.list(this.page(), this.pageSize(), this.search())
      .subscribe({
        next: (res: Page<User>) => {
          this.users.set(res.items);
          this.total.set(res.total);
          this.loading.set(false);
        },
        error: (e) => {
          this.error.set('No se pudo cargar la lista de usuarios.');
          this.loading.set(false);
          console.error(e);
        }
      });
  }

  go(p: number) {
    if (p < 1 || p > this.totalPages()) return;
    this.page.set(p);
    this.load();
  }
}
