import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DarumasGralPageRoutingModule } from './darumas-gral-routing.module';

import { DarumasGralPage } from './darumas-gral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DarumasGralPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DarumasGralPage]
})
export class DarumasGralPageModule {}
