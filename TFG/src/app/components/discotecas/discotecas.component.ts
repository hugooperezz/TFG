import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DiscotecaService } from '../../servicios/discotecas.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './discotecas.component.html',
  styleUrl: './discotecas.component.css',
})
export class DiscotecasComponent {
  discotecas: any[] = [];

  constructor(private _discotecasService: DiscotecaService) {}

  ngOnInit(): void {
    this.discotecas = this._discotecasService.getDiscotecas();
  }
}
