import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any) {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }

  loginUsuario(correo: string, password: string) {
    return this.http
      .post<{ mensaje: string; usuario: any }>(`${this.apiUrl}/login`, {
        correo,
        password,
      })
      .pipe(
        catchError((error) => {
          console.error('Error en AuthService:', error);
          return throwError(
            () => new Error(error.error?.error || 'Error desconocido')
          );
        })
      );
  }
}
