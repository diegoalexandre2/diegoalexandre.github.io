import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface ItemCarrinho {
  produtoId: number;
  nome: string;
  quantidade: number;
  precoUnitario: number;
}

@Component({
  selector: 'app-simulador-vendas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './simulador-vendas.component.html',
  styleUrl: './simulador-vendas.component.scss'
})
export class SimuladorVendasComponent {
  private readonly STORAGE_KEY = 'portfolio_simulador_vendas';

  produtos: Produto[] = [
    { id: 1, nome: 'Plano Essencial', preco: 49.9 },
    { id: 2, nome: 'Plano Profissional', preco: 97.5 },
    { id: 3, nome: 'Implantação e Treinamento', preco: 350 },
    { id: 4, nome: 'Customização avulsa', preco: 180 }
  ];

  carrinho: ItemCarrinho[] = [];

  produtoSelecionadoId: number | null = this.produtos[0]?.id ?? null;
  quantidade = 1;

  constructor() {
    this.carregarDoStorage();
  }

  get total(): number {
    return this.carrinho.reduce(
      (acc, item) => acc + Number(item.precoUnitario) * Number(item.quantidade),
      0
    );
  }

  adicionarItem(): void {
    const quantidadeNumero = Number(this.quantidade);
    if (!this.produtoSelecionadoId || quantidadeNumero <= 0) {
      return;
    }

    const produto = this.produtos.find((p) => p.id === this.produtoSelecionadoId);
    if (!produto) {
      return;
    }

    const existente = this.carrinho.find((c) => c.produtoId === produto.id);
    if (existente) {
      existente.quantidade = Number(existente.quantidade) + quantidadeNumero;
    } else {
      this.carrinho.push({
        produtoId: produto.id,
        nome: produto.nome,
        quantidade: quantidadeNumero,
        precoUnitario: produto.preco
      });
    }

    this.quantidade = 1;
    this.salvarNoStorage();
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinho = this.carrinho.filter((c) => c.produtoId !== item.produtoId);
    this.salvarNoStorage();
  }

  limparCarrinho(): void {
    this.carrinho = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private salvarNoStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.carrinho));
  }

  private carregarDoStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return;
    }

    try {
      const parsed = JSON.parse(data) as ItemCarrinho[];
      this.carrinho = parsed.map((item) => ({
        ...item,
        quantidade: Number(item.quantidade),
        precoUnitario: Number(item.precoUnitario)
      }));
    } catch {
      this.carrinho = [];
    }
  }
}

