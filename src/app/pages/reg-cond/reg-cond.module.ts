import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegCondPageRoutingModule } from './reg-cond-routing.module';

import { RegCondPage } from './reg-cond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegCondPageRoutingModule
  ],
  declarations: [RegCondPage]
})
export class RegCondPageModule {}
