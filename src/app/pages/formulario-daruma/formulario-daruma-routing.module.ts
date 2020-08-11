import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioDarumaPage } from './formulario-daruma.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioDarumaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioDarumaPageRoutingModule {}
