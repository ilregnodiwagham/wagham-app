import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubclassesPage } from './subclasses.page';

const routes: Routes = [
  {
    path: '',
    component: SubclassesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubclassesPageRoutingModule {}
