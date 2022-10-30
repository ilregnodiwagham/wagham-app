import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BackgroundsPageRoutingModule } from './backgrounds-routing.module';

import { BackgroundsPage } from './backgrounds.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BackgroundsPageRoutingModule,
    SharedModule
  ],
  declarations: [BackgroundsPage]
})
export class BackgroundsPageModule {}
