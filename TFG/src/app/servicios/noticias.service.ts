import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  private noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'La Cue presenta su nuevo ciclo de música electrónica',
      descripcion:
        'Cada sábado de junio, La Cue contará con DJs invitados de renombre nacional para llevar la música electrónica al siguiente nivel.',
      imagen: 'Cue2.jpg',
      fecha: '2025-06-01',
    },
    {
      id: 2,
      titulo: 'Tarantino lanza sus noches de cine y copas',
      descripcion:
        'El pub Tarantino inicia un ciclo temático donde cada viernes proyectará clásicos del cine mientras ofrece promociones en bebidas.',
      imagen: 'Tarantino2.jpeg',
      fecha: '2025-06-02',
    },
    {
      id: 3,
      titulo: 'Closer celebra su fiesta universitaria “Toy Crazy”',
      descripcion:
        'Este fin de semana, la Sala Closer organiza su icónica fiesta universitaria con reggaetón, pop y un ambiente inigualable.',
      imagen: 'Closer2.png',
      fecha: '2025-06-03',
    },
    {
      id: 4,
      titulo: 'Belle Fusión inaugura terraza de verano con DJs lounge',
      descripcion:
        'La Belle Fusión estrena su terraza de verano con sesiones deep house y ambiente chill para disfrutar al aire libre.',
      imagen: 'belle2.jpeg',
      fecha: '2025-06-04',
    },
    {
      id: 5,
      titulo: 'Cue participa en el ciclo musical “Hoy es jueves”',
      descripcion:
        'La Cue se suma a esta iniciativa cultural local ofreciendo conciertos de flamenco y jazz los jueves por la noche.',
      imagen: 'Cue3.jpg',
      fecha: '2025-06-05',
    },
    {
      id: 6,
      titulo: 'Noche indie en Tarantino con bandas locales',
      descripcion:
        'Tarantino acoge a bandas emergentes de la escena indie madrileña para una noche de música en vivo.',
      imagen: 'Tarantino3.jpeg',
      fecha: '2025-06-06',
    },
    {
      id: 7,
      titulo: 'Closer anuncia evento especial “Super Tardeo”',
      descripcion:
        'El domingo por la tarde, Closer organiza un evento para los amantes de la fiesta diurna con música, tapas y cócteles.',
      imagen: 'Closer3.jpg',
      fecha: '2025-06-07',
    },
    {
      id: 8,
      titulo: 'Belle Fusión organiza fiesta temática “Noche Ibicenca”',
      descripcion:
        'Este sábado, Belle Fusión se transforma en Ibiza con decoración blanca, cócteles especiales y música house en directo.',
      imagen: 'belle3.jpeg',
      fecha: '2025-06-08',
    },
  ];

  getNoticias(): Observable<Noticia[]> {
    return of(this.noticias);
  }

  getUltimasNoticias(limit: number = 8): Observable<Noticia[]> {
    return of(this.noticias.slice(0, limit));
  }
}
