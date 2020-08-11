import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioPassPageRoutingModule } from './cambio-pass-routing.module';

import { CambioPassPage } from './cambio-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CambioPassPageRoutingModule
  ],
  declarations: [CambioPassPage]
})
export class CambioPassPageModule {}
