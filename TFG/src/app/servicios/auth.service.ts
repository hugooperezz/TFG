import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any) {
    return this.http.post(`${this.apiUrl}/usuarios`, usuario);
  }

  loginUsuario(correo: string, password: string) {
    return this.http.post<{ mensaje: string; usuario: any }>(
      'http://localhost:3000/api/login',
      { correo, password }
    );
  }
}
