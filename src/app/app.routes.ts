import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home').then((m) => m.Home) },
    { path: 'songs', loadComponent: () => import('./songs/songs').then((m) => m.Songs) },
    { path: 'projects', loadComponent: () => import('./projects/projects').then((m) => m.Projects) },
    { path: 'faq', loadComponent: () => import('./faq/faq').then((m) => m.Faq) },
];
