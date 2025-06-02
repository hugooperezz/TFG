import { Component } from '@angular/core';
import { AuthService } from '../../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../servicios/usuario.service'; // IMPORTADO

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
    this.authService.loginUsuario(this.correo, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.usuarioService.setUsuario(res.usuario);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert(err.error?.error || 'Error al iniciar sesión');
      },
    });
  }
}
