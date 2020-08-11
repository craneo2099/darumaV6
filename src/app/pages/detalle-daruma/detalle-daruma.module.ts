import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleDarumaPageRoutingModule } from './detalle-daruma-routing.module';

import { DetalleDarumaPage } from './detalle-daruma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleDarumaPageRoutingModule
  ],
  declarations: [DetalleDarumaPage]
})
export class DetalleDarumaPageModule {}
