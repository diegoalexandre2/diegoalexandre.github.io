import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'sobre', pathMatch: 'full' },
  {
    path: 'sobre',
    loadComponent: () =>
      import('./sobre/sobre.component').then((m) => m.SobreComponent)
  },
  {
    path: 'experiencia',
    loadComponent: () =>
      import('./experiencia/experiencia.component').then(
        (m) => m.ExperienciaComponent
      )
  },
  {
    path: 'tecnologias',
    loadComponent: () =>
      import('./tecnologias/tecnologias.component').then(
        (m) => m.TecnologiasComponent
      )
  },
  {
    path: 'projetos',
    loadComponent: () =>
      import('./projetos/projetos.component').then((m) => m.ProjetosComponent)
  },
  {
    path: 'simulador',
    loadComponent: () =>
      import('./simulador/simulador.component').then((m) => m.SimuladorComponent)
  },
  {
    path: 'formacao',
    loadComponent: () =>
      import('./formacao/formacao.component').then((m) => m.FormacaoComponent)
  },
  {
    path: 'curriculo',
    loadComponent: () =>
      import('./curriculo/curriculo.component').then((m) => m.CurriculoComponent)
  },
  {
    path: 'contato',
    loadComponent: () =>
      import('./contato/contato.component').then((m) => m.ContatoComponent)
  }
];
