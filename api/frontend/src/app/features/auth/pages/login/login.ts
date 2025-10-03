import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

// SweetAlert2 por CDN
declare const Swal: any;

const isBrowser = typeof window !== 'undefined';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
  <section class="login-wrap">
    <div class="card p-4 shadow-sm" style="max-width:420px;margin:auto;">
      <h2 class="mb-3">Iniciar sesión</h2>

      <form [formGroup]="form" (ngSubmit)="submit()" class="d-grid gap-2">
        <div>
          <label class="form-label">Email</label>
          <input type="email" formControlName="email" class="form-control" />
        </div>

        <div>
          <label class="form-label">Contraseña</label>
          <input type="password" formControlName="password" class="form-control" />
        </div>

        <button class="btn btn-primary" [disabled]="form.invalid || loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>

        <a routerLink="/auth/register" class="text-decoration-none">Crear cuenta</a>
      </form>
    </div>
  </section>
  `,
  styles: [`
    .login-wrap{ min-height:100dvh; display:grid; place-items:center; padding:16px; }
  `]
})
export class Login {
  loading = false;
  error: string | null = null;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.error = null;

    this.auth.login(this.form.value as any).subscribe({
      next: () => {
        this.loading = false;

        // SweetAlert de éxito (solo en navegador)
        if (isBrowser && typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido 👋',
            text: 'Inicio de sesión exitoso',
            timer: 1400,
            showConfirmButton: false
          }).then(() => this.redirectByRole());
        } else {
          this.redirectByRole();
        }
      },
      error: (e) => {
        this.loading = false;
        const msg = e?.error?.message ?? 'Credenciales inválidas';

        // SweetAlert de error (solo en navegador)
        if (isBrowser && typeof Swal !== 'undefined') {
          Swal.fire({ icon: 'error', title: 'Oops…', text: msg });
        } else {
          this.error = msg; // fallback por si no hay Swal (SSR)
        }
      }
    });
  }

  private redirectByRole() {
    const user = this.auth.currentUser;
    if (user?.roles?.includes('admin')) {
      this.router.navigateByUrl('/dashboard'); // o /admin
    } else {
      this.router.navigateByUrl('/products');
    }
  }
}
