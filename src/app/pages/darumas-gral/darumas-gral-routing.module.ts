import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DarumasGralPage } from './darumas-gral.page';
import { DetalleDarumaPage } from '../detalle-daruma/detalle-daruma.page';
import { AddDarumaQrPage } from '../add-daruma-qr/add-daruma-qr.page';

const routes: Routes = [
  {
    path: '',
    component: DarumasGralPage,
    // children: [{
    //   path: 'list',
    //   component: DetalleDarumaPage
    // },{
    //   path: 'child',
    //   component: AddDarumaQrPage
    // }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DarumasGralPageRoutingModule {}
