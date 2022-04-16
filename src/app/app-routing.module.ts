import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './ui/home/home.page';
import { PostsPage } from './ui/home/posts/posts.page';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./ui/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage,
    loadChildren: () => import('./ui/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./ui/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'comments',
    loadChildren: () => import('./comments/comments.module').then( m => m.CommentsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
