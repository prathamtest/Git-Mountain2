import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtCdPage } from './mt-cd.page';

const routes: Routes = [
  {
    path: '',
    component: MtCdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtCdPageRoutingModule {}
