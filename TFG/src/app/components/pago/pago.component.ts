import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent implements OnInit {
  discotecaId: number = -1;
  pagoRealizado = false;
  ticketImagen = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.discotecaId = +params['id'];
    });
  }

  realizarPago(): void {
    this.pagoRealizado = true;

    switch (this.discotecaId) {
      case 0:
        this.ticketImagen = 'assets/tickets/ticket_cue.png';
        break;
      case 1:
        this.ticketImagen = 'assets/tickets/ticket_tarantino.png';
        break;
      case 2:
        this.ticketImagen = 'assets/tickets/ticket_closer.png';
        break;
      case 3:
        this.ticketImagen = 'assets/tickets/ticket_belle.png';
        break;
      default:
        this.ticketImagen = 'assets/tickets/ticket_default.png';
    }
  }

  descargarImagen(): void {
    const a = document.createElement('a');
    a.href = this.ticketImagen;
    a.download = 'ticket_discoteca.png';
    a.click();
  }
}
