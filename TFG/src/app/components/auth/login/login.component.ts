import { Component } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../servicios/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  correo: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  login() {
    console.log('Intentando login con:', {
      correo: this.correo,
      password: this.password,
    }); // ← Depuración

    this.authService.loginUsuario(this.correo, this.password).subscribe({
      next: (res) => {
        console.log('Respuesta del servidor:', res); // ← Depuración
        if (res.usuario) {
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
          this.usuarioService.setUsuario(res.usuario);
          this.router.navigate(['/home']);
        } else {
          alert('La respuesta del servidor no incluye datos de usuario');
        }
      },
      error: (err) => {
        console.error('Error en el login:', err); // ← Depuración
        alert(err.message || 'Error al iniciar sesión');
      },
    });
  }
}
