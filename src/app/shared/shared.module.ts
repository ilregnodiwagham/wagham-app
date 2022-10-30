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
  SpellResponsiveTableComponent,
  SubclassResponsiveTableComponent
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
    SpellResponsiveTableComponent,
    SubclassResponsiveTableComponent
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
    SpellResponsiveTableComponent,
    SubclassResponsiveTableComponent
  ]
})
export class SharedModule {}
