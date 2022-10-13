import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CAutoPageRoutingModule } from './c-auto-routing.module';

import { CAutoPage } from './c-auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CAutoPageRoutingModule
  ],
  declarations: [CAutoPage]
})
export class CAutoPageModule {}
