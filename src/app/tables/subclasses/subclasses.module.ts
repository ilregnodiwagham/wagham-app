import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubclassesPageRoutingModule } from './subclasses-routing.module';

import { SubclassesPage } from './subclasses.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubclassesPageRoutingModule,
    SharedModule
  ],
  declarations: [SubclassesPage]
})
export class SubclassesPageModule {}
