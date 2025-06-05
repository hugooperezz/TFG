import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DiscotecasComponent } from './components/discotecas/discotecas.component';
import { DiscotecaComponent } from './components/discoteca/discoteca.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'comentarios', component: ComentariosComponent },
  { path: 'discotecas', component: DiscotecasComponent },
  { path: 'discoteca/:id', component: DiscotecaComponent },
  { path: 'buscar/:termino', component: BuscadorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
