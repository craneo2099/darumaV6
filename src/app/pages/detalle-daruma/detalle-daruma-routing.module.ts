import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleDarumaPage } from './detalle-daruma.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleDarumaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleDarumaPageRoutingModule {}
