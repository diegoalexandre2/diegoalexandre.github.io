import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Pessoa {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  senioridade: string;
  criadoEm: string;
}

@Component({
  selector: 'app-cadastro-pessoas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro-pessoas.component.html',
  styleUrl: './cadastro-pessoas.component.scss'
})
export class CadastroPessoasComponent {
  private readonly STORAGE_KEY = 'portfolio_cadastro_pessoas';

  pessoas: Pessoa[] = [];
  filtro = '';
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      cargo: ['', Validators.required],
      senioridade: ['', Validators.required]
    });

    this.carregarDoStorage();
  }

  get pessoasFiltradas(): Pessoa[] {
    const termo = this.filtro.trim().toLowerCase();
    if (!termo) {
      return this.pessoas;
    }
    return this.pessoas.filter((p) =>
      `${p.nome} ${p.email} ${p.cargo} ${p.senioridade}`.toLowerCase().includes(termo)
    );
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const novo: Pessoa = {
      id: Date.now(),
      ...this.form.value,
      criadoEm: new Date().toLocaleString()
    };

    this.pessoas = [novo, ...this.pessoas];
    this.form.reset();
    this.form.markAsPristine();
    this.salvarNoStorage();
  }

  remover(pessoa: Pessoa): void {
    this.pessoas = this.pessoas.filter((p) => p.id !== pessoa.id);
    this.salvarNoStorage();
  }

  limparTudo(): void {
    if (!confirm('Tem certeza que deseja apagar todos os cadastros salvos neste navegador?')) {
      return;
    }
    this.pessoas = [];
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private salvarNoStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.pessoas));
  }

  private carregarDoStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      return;
    }

    try {
      this.pessoas = JSON.parse(data) as Pessoa[];
    } catch {
      this.pessoas = [];
    }
  }
}

