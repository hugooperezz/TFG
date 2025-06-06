import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Discoteca {
  nombre: string;
  descripcion: string;
  imagen: string;
  imagenes?: string[];
  ubicacion: string;
  horario: string;
  musica: string[];
  precioEntrada: number;
  edadMinima: number;
  redes: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}

@Injectable({ providedIn: 'root' })
export class DiscotecaService {
  private apiUrl = 'http://localhost:3000/api';

  // Datos locales de prueba
  private discotecas: Discoteca[] = [
    {
      nombre: 'La Cue',
      descripcion:
        'La Discoteca Cue, ubicada en la Calle Stuart 177 de Aranjuez (Madrid), es uno de los locales nocturnos más populares de la zona. Abre sus puertas los jueves, viernes y sábados desde las 23:30 hasta las 5:00, ofreciendo un ambiente vibrante y moderno para los amantes de la música y el baile. Este club combina el concepto de discoteca y lounge, con una amplia pista de baile, iluminación LED avanzada y un sistema de sonido de última generación. La música es variada, abarcando desde ritmos latinos y pop internacional hasta electrónica y hip hop, adaptándose a diferentes gustos musicales. Cue también destaca por sus eventos temáticos, como noches retro, karaoke y conciertos en vivo, incluyendo tributos a bandas de los años 80 y 90. Además, colabora en iniciativas culturales locales, como el ciclo musical "Hoy es jueves", que promueve conciertos de flamenco, jazz y música alternativa. El local ofrece servicios adicionales como coctelería, zona de restaurante con opciones gourmet, y reservas VIP para quienes buscan una experiencia más exclusiva. También cuenta con accesibilidad para personas con movilidad reducida y diversas formas de pago, incluyendo NFC y tarjetas de crédito. Con una valoración media de 3.9 sobre 5 basada en más de 220 opiniones, Cue es una opción destacada para quienes buscan una noche animada y diversa en Aranjuez.',
      imagen: 'Cue.png',
      imagenes: ['Cue.png', 'Cue2.jpg', 'Cue3.jpg'],
      ubicacion: 'Aranjuez, Madrid',
      horario: '22:00 - 06:00',
      musica: ['Techno', 'House', 'Electrónica'],
      precioEntrada: 15,
      edadMinima: 18,
      redes: {
        instagram: 'https://www.instagram.com/cuearanjuez/',
        facebook: 'https://www.facebook.com/CueAranjuez/',
      },
    },
    {
      nombre: 'Tarantino',
      descripcion:
        'El Pub Tarantino, ubicado en la Calle Almíbar 165 de Aranjuez, es un bar de copas y club nocturno que destaca por su ambiente acogedor y su decoración moderna con un toque americano ochentero. Es un lugar ideal para disfrutar de buena música, cócteles y una atmósfera vibrante en compañía de amigos. El local ofrece una amplia variedad de bebidas, incluyendo cócteles, gin tonics y cafés, y cuenta con un club de fumadores anexo. Abre todos los días desde la tarde hasta altas horas de la madrugada, brindando un espacio para relajarse y disfrutar de la noche.',
      imagen: 'Tarantino.jpg',
      imagenes: ['Tarantino.jpg', 'Tarantino2.jpeg', 'Tarantino3.jpeg'],
      ubicacion: 'Aranjuez, Madrid',
      horario: '21:00 - 05:30',
      musica: ['Rock', 'Indie', 'Alternativa'],
      precioEntrada: 10,
      edadMinima: 18,
      redes: {
        instagram: 'https://www.instagram.com/tarantino_aranjuez/',
        facebook: 'https://www.facebook.com/TarantinoAranjuez/',
      },
    },
    {
      nombre: 'Closer',
      descripcion:
        'La Sala Closer, situada en la Calle Eras 2 de Aranjuez (Madrid), es un club nocturno que destaca por su ambiente vibrante y moderno. Con un sistema de sonido e iluminación de última generación, ofrece una experiencia única para los amantes de la música y el baile. La sala cuenta con DJs residentes y artistas invitados que mezclan una variedad de géneros, desde electrónica y house hasta pop y reguetón. Closer organiza eventos temáticos como "Closer Young" para menores de edad en horario vespertino, "Super Tardeos" para quienes prefieren disfrutar de la fiesta por la tarde, y "Closer Toy Crazy", una fiesta universitaria con el mejor ambiente y música de la zona. El horario habitual de apertura es de 23:00 a 6:00, aunque algunos eventos comienzan a las 17:00.',
      imagen: 'Closer.png',
      imagenes: ['Closer.png', 'Closer2.png', 'Closer3.jpg'],
      ubicacion: 'Aranjuez, Madrid',
      horario: '23:00 - 07:00',
      musica: ['Reggaetón', 'Latino', 'Pop'],
      precioEntrada: 12,
      edadMinima: 21,
      redes: {
        instagram: 'https://www.instagram.com/closeraranjuez/',
        facebook: 'https://www.facebook.com/p/Closer-Aranjuez-100069973280675/',
      },
    },
    {
      nombre: 'BelePop',
      descripcion:
        'La Belle Fusión, también conocida como My Belle 2.0, es un destacado pub y club nocturno situado en la Calle Palacio Silvela 2, en el centro de Aranjuez, Madrid. Este local es reconocido por su ambiente cosmopolita y moderno, ofreciendo una experiencia única tanto para quienes buscan un lugar para disfrutar de un café por la tarde como para aquellos que desean sumergirse en la vida nocturna hasta altas horas de la madrugada. El establecimiento cuenta con una decoración contemporánea y una terraza de verano, creando el entorno perfecto para socializar y disfrutar de una amplia variedad de bebidas. Además, La Belle Fusión organiza regularmente eventos y fiestas temáticas que atraen a una clientela diversa y animada.',
      imagen: 'belle.jpeg',
      imagenes: ['belle.jpeg', 'belle2.jpeg', 'belle3.jpeg'],
      ubicacion: 'Aranjuez, Madrid',
      horario: '20:00 - 03:00',
      musica: ['Lounge', 'Deep House'],
      precioEntrada: 20,
      edadMinima: 25,
      redes: {
        instagram: 'https://www.instagram.com/labelle_noche/',
        facebook: 'https://www.facebook.com/labellefusion/',
      },
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
