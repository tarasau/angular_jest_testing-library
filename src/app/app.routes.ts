import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'base-components',
    loadComponent: () => import('./features/base-components-demo/base-components-demo.component')
      .then(m => m.baseComponentsDemoComponent),
    title: 'base Components Demo'
  }
];
