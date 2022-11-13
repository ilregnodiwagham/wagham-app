import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingsPage } from './buildings.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingsPageRoutingModule {}
