import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Comentario {
  id?: number;
  texto: string;
  usuario: string;
  fecha?: string; // Generado por el servidor
}

export interface Usuario {
  nombre?: string;
  correo?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private apiUrl = 'http://localhost:3000/api/com';

  constructor(private http: HttpClient) {}

  // Enviar nuevo comentario
  enviarComentario(comentario: Comentario): Observable<any> {
    return this.http.post(this.apiUrl, {
      texto: comentario.texto,
      usuario: comentario.usuario,
    });
  }

  // Obtener todos los comentarios
  obtenerComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.apiUrl);
  }

  // Obtener un comentario específico por ID
  obtenerComentario(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.apiUrl}/${id}`);
  }

  // Eliminar un comentario
  eliminarComentario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
