import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatsPage } from './feats.page';

const routes: Routes = [
  {
    path: '',
    component: FeatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatsPageRoutingModule {}
