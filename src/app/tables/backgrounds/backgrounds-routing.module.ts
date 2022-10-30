import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackgroundsPage } from './backgrounds.page';

const routes: Routes = [
  {
    path: '',
    component: BackgroundsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackgroundsPageRoutingModule {}
