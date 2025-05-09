import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscotecaService } from '../../servicios/discotecas.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-buscador',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css',
})
export class BuscadorComponent implements OnInit {
  discotecas: any[] = [];
  termino: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _discotecasService: DiscotecaService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.termino = params['termino'];
      this.discotecas = this._discotecasService.buscarDiscoteca(
        params['termino']
      );
    });
  }
}
