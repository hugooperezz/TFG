import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Discoteca {
  nombre: string;
  descripcion: string;
  imagen: string;
  ubicacion: string;
  horario: string;
  musica: string[];
  precioEntrada: number;
  edadMinima: number;
}

@Injectable({ providedIn: 'root' })
export class DiscotecaService {
  private apiUrl = 'http://localhost:3000/api';

  // Datos locales de prueba
  private discotecas: Discoteca[] = [
    {
      nombre: 'La Cue',
      descripcion:
        'Una discoteca futurista con luces LED y pantallas envolventes.',
      imagen: 'Cue.png',
      ubicacion: 'Madrid, España',
      horario: '22:00 - 06:00',
      musica: ['Techno', 'House', 'Electrónica'],
      precioEntrada: 15,
      edadMinima: 18,
    },
    {
      nombre: 'Tarantino',
      descripcion:
        'Ambiente underground con música alternativa y decoración industrial.',
      imagen: 'Tarantino.jpg',
      ubicacion: 'Barcelona, España',
      horario: '21:00 - 05:30',
      musica: ['Rock', 'Indie', 'Alternativa'],
      precioEntrada: 10,
      edadMinima: 18,
    },
    {
      nombre: 'Closer',
      descripcion:
        'Fiestas temáticas con ambientación tropical y cócteles exóticos.',
      imagen: 'Closer.png',
      ubicacion: 'Valencia, España',
      horario: '23:00 - 07:00',
      musica: ['Reggaetón', 'Latino', 'Pop'],
      precioEntrada: 12,
      edadMinima: 21,
    },
    {
      nombre: 'BelePop',
      descripcion:
        'Ubicada en la azotea de un rascacielos con vistas increíbles de la ciudad.',
      imagen: 'belle.jpeg',
      ubicacion: 'Sevilla, España',
      horario: '20:00 - 03:00',
      musica: ['Lounge', 'Deep House'],
      precioEntrada: 20,
      edadMinima: 25,
    },
  ];

  constructor(private http: HttpClient) {}

  // Obtener todas las discotecas (datos locales)
  getDiscotecas(): Discoteca[] {
    return this.discotecas;
  }

  // Obtener una discoteca por su índice (datos locales)
  getDiscoteca(index: number): Discoteca {
    return this.discotecas[index];
  }

  // Buscar discotecas por nombre
  buscarDiscoteca(termino: string): Discoteca[] {
    const resultado: Discoteca[] = [];
    termino = termino.toLowerCase();

    for (let discoteca of this.discotecas) {
      if (discoteca.nombre.toLowerCase().includes(termino)) {
        resultado.push(discoteca);
      }
    }

    return resultado;
  }

  // Obtener comentarios desde el backend
  getComentarios(discotecaId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/discotecas/${discotecaId}/comentarios`
    );
  }

  // Enviar comentario al backend
  addComentario(discotecaId: number, comentario: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/discotecas/${discotecaId}/comentarios`,
      comentario
    );
  }
}
