import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReputationModalComponent } from './commands/reputation-command/reputation-modal/reputation-modal.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import {
  ResponsiveTableComponent,
  ItemResponsiveTableComponent,
  CharacterResponsiveTableComponent,
  BackgroundResponsiveTableComponent,
  FeatResponsiveTableComponent,
  SpellResponsiveTableComponent
} from './responsive-table/responsive-table.component';

@NgModule({
  declarations: [
    BackgroundResponsiveTableComponent,
    CharacterResponsiveTableComponent,
    FeatResponsiveTableComponent,
    FilterModalComponent,
    ItemResponsiveTableComponent,
    ReputationModalComponent,
    ResponsiveTableComponent,
    SpellResponsiveTableComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    BackgroundResponsiveTableComponent,
    CharacterResponsiveTableComponent,
    FeatResponsiveTableComponent,
    FilterModalComponent,
    ItemResponsiveTableComponent,
    ReputationModalComponent,
    ResponsiveTableComponent,
    SpellResponsiveTableComponent
  ]
})
export class SharedModule {}
