import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PAutoPage } from './p-auto.page';

const routes: Routes = [
  {
    path: '',
    component: PAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PAutoPageRoutingModule {}
