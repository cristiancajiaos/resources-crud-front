import { Routes } from '@angular/router';
import { Home } from './modules/home/home';
import { Posts } from './modules/posts/posts';

export const routes: Routes = [
  {
    path: 'home',
    component: Home
  },
  {
    path: 'posts',
    component: Posts
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
