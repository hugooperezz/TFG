import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscotecaService } from '../../servicios/discotecas.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-heroe',
  imports: [RouterLink, NgIf],
  templateUrl: './discoteca.component.html',
  styleUrl: './discoteca.component.css',
})
export class DiscotecaComponent {
  discoteca: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private _DiscotecasService: DiscotecaService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.discoteca = this._DiscotecasService.getDiscoteca(params['id']);
    });
  }
}
