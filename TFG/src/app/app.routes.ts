import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DiscotecasComponent } from './components/discotecas/discotecas.component';
import { DiscotecaComponent } from './components/discoteca/discoteca.component';
import { BuscadorComponent } from './components/buscador/buscador.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'discotecas', component: DiscotecasComponent },
  { path: 'discoteca/:id', component: DiscotecaComponent },
  { path: 'buscar/:termino', component: BuscadorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
