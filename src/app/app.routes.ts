// core
import { Routes } from '@angular/router';

// components
import { Home } from './home/home';

export const routes: Routes = [
    // eager loaded
    { path: '', component: Home },

    // lazy loaded
    { path: 'songs', loadComponent: () => import('./songs/songs').then((m) => m.Songs) },
    { path: 'music', loadComponent: () => import('./music/music').then((m) => m.Music) },
    { path: 'about', loadComponent: () => import('./about/about').then((m) => m.About) },
    { path: 'faq', loadComponent: () => import('./faq/faq').then((m) => m.Faq) },
];
