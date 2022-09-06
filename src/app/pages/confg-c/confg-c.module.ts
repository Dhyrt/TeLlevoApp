import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfgCPageRoutingModule } from './confg-c-routing.module';

import { ConfgCPage } from './confg-c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfgCPageRoutingModule
  ],
  declarations: [ConfgCPage]
})
export class ConfgCPageModule {}
