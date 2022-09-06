import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfgAPage } from './confg-a.page';

const routes: Routes = [
  {
    path: '',
    component: ConfgAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfgAPageRoutingModule {}
