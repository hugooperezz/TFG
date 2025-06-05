import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Noticia, NoticiasService } from '../../servicios/noticias.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  noticias: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.getUltimasNoticias().subscribe((noticias) => {
      this.noticias = noticias;
    });
  }
}
