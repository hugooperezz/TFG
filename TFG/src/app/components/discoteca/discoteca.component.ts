import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./discoteca.component.css'],
})
export class DiscotecaComponent implements OnInit {
  discoteca: any = {};
  discotecaId: number = -1;
  usuarioLogueado: string | null = null;
  nombreUsuario: string = '';

  nuevoComentario = {
    texto: '',
    valoracion: 5,
  };

  comentarios: any[] = [];

  indiceImagenActual: number = 0;
  imagenesDemo: string[] = [
    'assets/img/discotecas/demo1.jpg',
    'assets/img/discotecas/demo2.jpg',
    'assets/img/discotecas/demo3.jpg',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private discotecaService: DiscotecaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.discotecaId = +params['id'];
      this.discoteca = this.discotecaService.getDiscoteca(this.discotecaId);

      this.discoteca.imagenes = this.discoteca.imagenes ?? [
        this.discoteca.imagen,
        ...this.imagenesDemo,
      ];

      this.cargarComentarios();
    });

    this.usuarioLogueado = localStorage.getItem('usuario');

    if (this.usuarioLogueado) {
      try {
        const usuarioObj = JSON.parse(this.usuarioLogueado);
        this.nombreUsuario = usuarioObj.nombre ?? '';
      } catch (error) {
        console.error('Error al parsear usuario del localStorage', error);
      }
    }
  }

  cargarComentarios(): void {
    this.discotecaService.getComentarios(this.discotecaId).subscribe(
      (comentarios) => {
        this.comentarios = comentarios;
      },
      (error) => {
        console.error('Error al cargar comentarios:', error);
      }
    );
  }

  agregarComentario(): void {
    const texto = this.nuevoComentario.texto.trim();

    if (this.nombreUsuario && texto) {
      const comentarioData = {
        usuario: this.nombreUsuario,
        texto,
        valoracion: this.nuevoComentario.valoracion,
      };

      this.discotecaService
        .addComentario(this.discotecaId, comentarioData)
        .subscribe({
          next: () => {
            this.nuevoComentario = { texto: '', valoracion: 5 };
            this.cargarComentarios();
          },
          error: (err) => {
            console.error('Error al agregar comentario:', err);
            alert('No se pudo agregar el comentario.');
          },
        });
    }
  }

  calcularMediaValoraciones(): number {
    if (this.comentarios.length === 0) return 0;

    const total = this.comentarios.reduce(
      (acc, curr) => acc + (curr.valoracion || 0),
      0
    );
    return total / this.comentarios.length;
  }

  imagenSiguiente(): void {
    this.indiceImagenActual =
      (this.indiceImagenActual + 1) % this.discoteca.imagenes.length;
  }

  imagenAnterior(): void {
    this.indiceImagenActual =
      (this.indiceImagenActual - 1 + this.discoteca.imagenes.length) %
      this.discoteca.imagenes.length;
  }

  cambiarImagen(indice: number): void {
    this.indiceImagenActual = indice;
  }
}
