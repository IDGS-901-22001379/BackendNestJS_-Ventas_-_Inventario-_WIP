import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../features/auth/auth.service';

// SweetAlert2 desde CDN
declare const Swal: any;

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayoutComponent {
  constructor(public auth: AuthService) {}

  logout() {
    Swal.fire({
      title: '¿Salir?',
      text: 'Cerrará tu sesión actual',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((r: any) => {
      if (r.isConfirmed) {
        this.auth.logout();
        Swal.fire('Sesión cerrada', '', 'success');
      }
    });
  }
}
