import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDarumaQrPage } from './add-daruma-qr.page';

const routes: Routes = [
  {
    path: '',
    component: AddDarumaQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDarumaQrPageRoutingModule {}
