import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegVehiPage } from './reg-vehi.page';

const routes: Routes = [
  {
    path: '',
    component: RegVehiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegVehiPageRoutingModule {}
