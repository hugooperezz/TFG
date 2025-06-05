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
      titulo: 'Apertura de la nueva discoteca Eclipse',
      descripcion:
        'La discoteca Eclipse abre sus puertas este sábado con DJ internacionales y una experiencia 360º.',
      imagen: 'Cue.png',
    },
    {
      id: 2,
      titulo: 'Noche retro en la Disco Flashback',
      descripcion:
        'Vuelve a los 80 con música, vestimenta y decoración de la época. Premios al mejor look retro.',
      imagen: 'fotoPrueba.png',
    },
    {
      id: 3,
      titulo: 'Concierto sorpresa de DJ Invisible',
      descripcion:
        'El famoso DJ Invisible aparece sin previo aviso en la Sala Nova y revoluciona la noche.',
      imagen: 'fotoPrueba.png',
    },
    {
      id: 4,
      titulo: 'La espuma invade el Club Aqua',
      descripcion:
        'Más de 500 asistentes disfrutaron de la fiesta de espuma más grande del verano.',
      imagen: 'fotoPrueba.png',
    },
    {
      id: 5,
      titulo: 'DJ Fuego hace arder la pista',
      descripcion:
        'Más de 3 horas de set y luces espectaculares encendieron el ambiente del Club Inferno.',
      imagen: 'fotoPrueba.png',
    },
    {
      id: 6,
      titulo: 'Fiesta exclusiva solo por invitación',
      descripcion:
        'La Discoteca Velvet organizó un evento cerrado con celebridades y música en vivo.',
      imagen: 'fotoPrueba.png',
    },
    {
      id: 7,
      titulo: 'Nuevos cócteles tropicales en Bora Club',
      descripcion:
        'Prueba la nueva selección de cócteles tropicales mientras bailas al ritmo de reggaetón y house.',
      imagen: 'fotoPrueba.png',
    },
    {
      id: 8,
      titulo: 'Batalla de DJs en directo este viernes',
      descripcion:
        '4 DJs se enfrentarán en el escenario del club BeatZone. ¡El público elegirá al ganador!',
      imagen: 'fotoPrueba.png',
    },
  ];

  getNoticias(): Observable<Noticia[]> {
    return of(this.noticias);
  }

  getUltimasNoticias(limit: number = 8): Observable<Noticia[]> {
    return of(this.noticias.slice(0, limit));
  }
}
