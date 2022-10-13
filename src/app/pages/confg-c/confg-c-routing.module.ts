import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfgCPage } from './confg-c.page';

const routes: Routes = [
  {
    path: '',
    component: ConfgCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfgCPageRoutingModule {}
