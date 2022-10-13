import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegCondPage } from './reg-cond.page';

const routes: Routes = [
  {
    path: '',
    component: RegCondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegCondPageRoutingModule {}
