import { Routes } from '@angular/router';
import { Home } from './modules/home/home';
import { Posts } from './modules/posts/posts';
import { Users } from './modules/users/users';

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
    path: 'users',
    component: Users
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
