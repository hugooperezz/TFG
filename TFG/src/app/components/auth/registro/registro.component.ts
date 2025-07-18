import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  nombre: string = '';
  correo: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.authService
      .registrarUsuario({
        nombre: this.nombre,
        correo: this.correo,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          console.log('Respuesta del backend:', res);
          alert('Usuario creado');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error al crear usuario:', err);
          alert('Error al crear usuario');
        },
      });
  }
}
