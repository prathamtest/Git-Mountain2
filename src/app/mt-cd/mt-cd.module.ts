import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MtCdPageRoutingModule } from './mt-cd-routing.module';

import { MtCdPage } from './mt-cd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtCdPageRoutingModule
  ],
  declarations: [MtCdPage]
})
export class MtCdPageModule {}
