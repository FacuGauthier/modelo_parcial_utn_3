import { Component, inject, input, output } from '@angular/core';
import { Receta } from '../../interfaces/receta';

@Component({
  imports: [],
  selector: 'app-tarjeta-receta',
  styleUrl: './tarjeta-receta.css',
  templateUrl: './tarjeta-receta.html',
})
export class TarjetaReceta {
  receta = input.required<Receta>()
  toggle = output<boolean>()

  onClick() {
    this.toggle.emit(!this.receta().favorita)
  }
}
