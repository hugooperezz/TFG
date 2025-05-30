import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DiscotecaService {
  private discotecas: Discoteca[] = [
    {
      nombre: 'Club Neon',
      descripcion:
        'Una discoteca futurista con luces LED y pantallas envolventes.',
      imagen: 'fotoPrueba.png',
      ubicacion: 'Madrid, España',
      horario: '22:00 - 06:00',
      musica: ['Techno', 'House', 'Electrónica'],
      precioEntrada: 15,
      edadMinima: 18,
    },
    {
      nombre: 'La Cueva',
      descripcion:
        'Ambiente underground con música alternativa y decoración industrial.',
      imagen: 'fotoPrueba.png',
      ubicacion: 'Barcelona, España',
      horario: '21:00 - 05:30',
      musica: ['Rock', 'Indie', 'Alternativa'],
      precioEntrada: 10,
      edadMinima: 18,
    },
    {
      nombre: 'Tropic Club',
      descripcion:
        'Fiestas temáticas con ambientación tropical y cócteles exóticos.',
      imagen: 'fotoPrueba.png',
      ubicacion: 'Valencia, España',
      horario: '23:00 - 07:00',
      musica: ['Reggaetón', 'Latino', 'Pop'],
      precioEntrada: 12,
      edadMinima: 21,
    },
    {
      nombre: 'Skyline',
      descripcion:
        'Ubicada en la azotea de un rascacielos con vistas increíbles de la ciudad.',
      imagen: 'fotoPrueba.png',
      ubicacion: 'Sevilla, España',
      horario: '20:00 - 03:00',
      musica: ['Lounge', 'Deep House'],
      precioEntrada: 20,
      edadMinima: 25,
    },
  ];

  constructor() {
    console.log('Servicio listo para usarse');
  }

  getDiscotecas() {
    return this.discotecas;
  }

  getDiscoteca(i: any) {
    return this.discotecas[i];
  }

  buscarDiscoteca(termino: string) {
    let discotecasArr: Discoteca[] = [];
    termino = termino.toLowerCase();

    for (let heroe of this.discotecas) {
      let nombre = heroe.nombre.toLowerCase();
      if (nombre.indexOf(termino) >= 0) {
        discotecasArr.push(heroe);
      }
    }
    return discotecasArr;
  }
}
export interface Discoteca {
  nombre: string; // Nombre de la discoteca
  descripcion: string; // Breve descripción o historia
  imagen: string; // URL o ruta de la imagen
  ubicacion: string; // Dirección o ciudad
  horario: string; // Ej: "22:00 - 06:00"
  musica: string[]; // Estilos de música (ej: ["Techno", "Reggaetón"])
  precioEntrada: number; // Precio aproximado de entrada
  edadMinima: number; // Edad mínima permitida
}
