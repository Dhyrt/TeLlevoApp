import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfgAPageRoutingModule } from './confg-a-routing.module';

import { ConfgAPage } from './confg-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfgAPageRoutingModule
  ],
  declarations: [ConfgAPage]
})
export class ConfgAPageModule {}
