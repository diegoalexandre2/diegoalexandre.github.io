import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Projeto {
  id: number;
  titulo: string;
  descricao: string;
  tecnologias: string[];
  imagem?: string;
  github?: string;
  demo?: string;
  favorito: boolean;
}

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.scss'
})
export class ProjetosComponent {
  private readonly STORAGE_KEY = 'portfolio_projetos_favoritos';

  projetos: Projeto[] = [
    {
      id: 1,
      titulo: 'DiretorWeb - Dashboard Financeiro',
      descricao:
        'Módulo de dashboard financeiro com visão consolidada de títulos a receber, a pagar, fluxo de caixa e evolução de vendas por período, focado em apoiar a tomada de decisão do gestor.',
      tecnologias: ['Angular', 'TypeScript', 'PrimeNG', 'SCSS', 'REST API'],
      imagem: 'imagens/Dashboard.jpeg',
      github: '',
      demo: '',
      favorito: false
    },
    {
      id: 2,
      titulo: 'DiretorWeb - Cadastro de Produtos',
      descricao:
        'Tela de cadastro de produtos com organização por abas, controle de estoque, tributação e características, permitindo parametrização avançada para diferentes segmentos.',
      tecnologias: ['Angular', 'TypeScript', 'Reactive Forms', 'PrimeNG'],
      imagem: 'imagens/Cadproduto.jpeg',
      github: '',
      demo: '',
      favorito: false
    },
    {
      id: 3,
      titulo: 'DiretorWeb - Agenda de Atendimentos',
      descricao:
        'Agenda visual semanal para gestão de horários de atendimento, com visualização por dia, semana, mês e filtro por profissional, otimizando a ocupação da equipe.',
      tecnologias: ['Angular', 'TypeScript', 'FullCalendar', 'PrimeNG', 'SCSS'],
      imagem: 'imagens/agenda.png',
      github: '',
      demo: '',
      favorito: false
    }
  ];

  constructor() {
    this.carregarFavoritosDoStorage();
  }

  toggleFavorito(projeto: Projeto): void {
    projeto.favorito = !projeto.favorito;
    this.salvarFavoritosNoStorage();
  }

  private salvarFavoritosNoStorage(): void {
    const favoritosIds = this.projetos
      .filter((p) => p.favorito)
      .map((p) => p.id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favoritosIds));
  }

  private carregarFavoritosDoStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return;
    }

    try {
      const favoritosIds: number[] = JSON.parse(data);
      this.projetos = this.projetos.map((projeto) => ({
        ...projeto,
        favorito: favoritosIds.includes(projeto.id)
      }));
    } catch {
      // se der erro no parse, apenas ignora e segue com o padrão
    }
  }
}

