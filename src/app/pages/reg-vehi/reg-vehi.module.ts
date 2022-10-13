import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegVehiPageRoutingModule } from './reg-vehi-routing.module';

import { RegVehiPage } from './reg-vehi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegVehiPageRoutingModule
  ],
  declarations: [RegVehiPage]
})
export class RegVehiPageModule {}
