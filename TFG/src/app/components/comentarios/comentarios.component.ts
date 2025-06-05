import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ComentarioService,
  Comentario,
} from '../../servicios/comentario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  usuarioActual: { nombre: string; correo?: string } | null = null;

  constructor(
    private comentariosService: ComentarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      try {
        const usuarioObj = JSON.parse(usuarioGuardado);
        this.usuarioActual = {
          nombre: usuarioObj.nombre ?? '',
          correo: usuarioObj.correo ?? '',
        };
        console.log('Usuario cargado:', this.usuarioActual);
        this.obtenerComentarios();
      } catch (error) {
        console.error('Error al parsear usuario del localStorage', error);
      }
    } else {
      console.warn('No hay usuario logueado');
    }
  }

  obtenerComentarios(): void {
    this.comentariosService.obtenerComentarios().subscribe({
      next: (comentarios) => {
        this.comentarios = comentarios;
      },
      error: (err) => {
        console.error('Error al obtener comentarios:', err);
      },
    });
  }

  enviarComentario(): void {
    const texto = this.nuevoComentario.trim();
    if (!texto || !this.usuarioActual) return;

    const comentario: Comentario = {
      texto: texto,
      usuario:
        this.usuarioActual.nombre || this.usuarioActual.correo || 'Anónimo',
    };

    this.comentariosService.enviarComentario(comentario).subscribe({
      next: () => {
        this.nuevoComentario = '';
        this.obtenerComentarios();
      },
      error: (err) => {
        console.error('Error al enviar el comentario:', err);
        alert('Ocurrió un error al publicar el comentario.');
      },
    });
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
