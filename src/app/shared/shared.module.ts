import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReputationModalComponent } from './commands/reputation-command/reputation-modal/reputation-modal.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import {
  ResponsiveTableComponent,
  ItemResponsiveTableComponent,
  CharacterResponsiveTableComponent,
  BackgroundResponsiveTableComponent
} from './responsive-table/responsive-table.component';

@NgModule({
  declarations: [
    BackgroundResponsiveTableComponent,
    CharacterResponsiveTableComponent,
    FilterModalComponent,
    ItemResponsiveTableComponent,
    ReputationModalComponent,
    ResponsiveTableComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    BackgroundResponsiveTableComponent,
    CharacterResponsiveTableComponent,
    FilterModalComponent,
    ItemResponsiveTableComponent,
    ReputationModalComponent,
    ResponsiveTableComponent
  ]
})
export class SharedModule {}
