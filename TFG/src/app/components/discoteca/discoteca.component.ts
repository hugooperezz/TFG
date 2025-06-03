import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscotecaService } from '../../servicios/discotecas.service';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heroe',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './discoteca.component.html',
  styleUrl: './discoteca.component.css',
})
export class DiscotecaComponent {
  discoteca: any = {};
  usuarioLogueado: string | null = null;
  nuevoComentario = {
    texto: '',
    valoracion: 5,
  };
  comentarios: { usuario: string; texto: string; valoracion: number }[] = [];
  indiceImagenActual: number = 0;

  // Array de imágenes de ejemplo (puedes modificarlo según tus necesidades)
  imagenesDemo: string[] = [
    'assets/img/discotecas/demo1.jpg',
    'assets/img/discotecas/demo2.jpg',
    'assets/img/discotecas/demo3.jpg',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _DiscotecasService: DiscotecaService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.discoteca = this._DiscotecasService.getDiscoteca(params['id']);
      // Asignamos imágenes demo si no hay imágenes definidas
      if (!this.discoteca.imagenes) {
        this.discoteca.imagenes = [this.discoteca.imagen, ...this.imagenesDemo];
      }
    });

    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioLogueado = usuario;
    }
  }

  // Métodos para el carrusel
  imagenSiguiente() {
    this.indiceImagenActual =
      (this.indiceImagenActual + 1) % this.discoteca.imagenes.length;
  }

  imagenAnterior() {
    this.indiceImagenActual =
      (this.indiceImagenActual - 1 + this.discoteca.imagenes.length) %
      this.discoteca.imagenes.length;
  }

  cambiarImagen(indice: number) {
    this.indiceImagenActual = indice;
  }

  agregarComentario() {
    if (this.usuarioLogueado && this.nuevoComentario.texto.trim()) {
      this.comentarios.push({
        usuario: this.usuarioLogueado,
        texto: this.nuevoComentario.texto,
        valoracion: Number(this.nuevoComentario.valoracion),
      });

      this.nuevoComentario = {
        texto: '',
        valoracion: 5,
      };
    }
  }

  calcularMediaValoraciones(): number {
    if (this.comentarios.length === 0) return 0;
    const total = this.comentarios.reduce(
      (acc, curr) => acc + curr.valoracion,
      0
    );
    return total / this.comentarios.length;
  }
}
