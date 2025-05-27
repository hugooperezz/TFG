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
  nuevoComentario = {
    texto: '',
    valoracion: 5,
  };
  comentarios: { texto: string; valoracion: number }[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _DiscotecasService: DiscotecaService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.discoteca = this._DiscotecasService.getDiscoteca(params['id']);
    });
  }

  agregarComentario() {
    if (this.nuevoComentario.texto.trim()) {
      this.comentarios.push({
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
