import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'reg-cond',
    loadChildren: () => import('./pages/reg-cond/reg-cond.module').then( m => m.RegCondPageModule)
  },
  {
    path: 'reg-vehi',
    loadChildren: () => import('./pages/reg-vehi/reg-vehi.module').then( m => m.RegVehiPageModule)
  },
  {
    path: 'p-auto',
    loadChildren: () => import('./pages/p-auto/p-auto.module').then( m => m.PAutoPageModule)
  },
  {
    path: 'c-auto',
    loadChildren: () => import('./pages/c-auto/c-auto.module').then( m => m.CAutoPageModule)
  },
  {
    path: 'confg',
    loadChildren: () => import('./pages/confg/confg.module').then( m => m.ConfgPageModule)
  },
  {
    path: 'confg-c',
    loadChildren: () => import('./pages/confg-c/confg-c.module').then( m => m.ConfgCPageModule)
  },
  {
    path: 'confg-a',
    loadChildren: () => import('./pages/confg-a/confg-a.module').then( m => m.ConfgAPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
