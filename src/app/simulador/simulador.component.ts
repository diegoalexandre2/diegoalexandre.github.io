import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CadastroPessoasComponent } from '../cadastro-pessoas/cadastro-pessoas.component';
import { SimuladorVendasComponent } from '../simulador-vendas/simulador-vendas.component';

@Component({
  selector: 'app-simulador',
  standalone: true,
  imports: [CommonModule, CadastroPessoasComponent, SimuladorVendasComponent],
  templateUrl: './simulador.component.html',
  styleUrl: './simulador.component.scss'
})
export class SimuladorComponent {}

