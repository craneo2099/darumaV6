import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioLoginPage } from './inicio-login.page';

const routes: Routes = [
  {
    path: '',
    component: InicioLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioLoginPageRoutingModule {}
