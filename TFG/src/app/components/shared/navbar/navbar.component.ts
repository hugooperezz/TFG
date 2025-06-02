import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UsuarioService } from '../../../servicios/usuario.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMenuOpen: boolean = false;
  usuarioLogueado: any = null;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.usuario$.subscribe((usuario) => {
      this.usuarioLogueado = usuario;
    });
  }

  buscarDiscoteca(termino: string) {
    this.router.navigate(['/buscar', termino]);
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/home']);
  }
}
