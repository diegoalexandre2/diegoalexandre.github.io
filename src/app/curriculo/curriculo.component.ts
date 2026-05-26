import { Component } from '@angular/core';

@Component({
  selector: 'app-curriculo',
  standalone: true,
  templateUrl: './curriculo.component.html',
  styleUrl: './curriculo.component.scss'
})
export class CurriculoComponent {
  imprimir() {
    window.print();
  }
}

