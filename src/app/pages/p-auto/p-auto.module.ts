import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PAutoPageRoutingModule } from './p-auto-routing.module';

import { PAutoPage } from './p-auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PAutoPageRoutingModule
  ],
  declarations: [PAutoPage]
})
export class PAutoPageModule {}
