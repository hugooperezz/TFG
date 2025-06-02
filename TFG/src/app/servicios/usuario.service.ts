import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioSubject.asObservable();

  setUsuario(usuario: any) {
    this.usuarioSubject.next(usuario);
  }

  getUsuarioActual() {
    return this.usuarioSubject.value;
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
}
