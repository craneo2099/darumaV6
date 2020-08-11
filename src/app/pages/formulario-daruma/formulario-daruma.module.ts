import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioDarumaPageRoutingModule } from './formulario-daruma-routing.module';

import { FormularioDarumaPage } from './formulario-daruma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormularioDarumaPageRoutingModule
  ],
  declarations: [FormularioDarumaPage]
})
export class FormularioDarumaPageModule {}
