import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDarumaQrPageRoutingModule } from './add-daruma-qr-routing.module';

import { AddDarumaQrPage } from './add-daruma-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDarumaQrPageRoutingModule
  ],
  declarations: [AddDarumaQrPage]
})
export class AddDarumaQrPageModule {}
