import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReputationModalComponent } from './commands/reputation-command/reputation-modal/reputation-modal.component';
import { TerritoriesModalComponent } from './commands/territories-command/territories-modal/territories-modal.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import {
  ResponsiveTableComponent,
  ItemResponsiveTableComponent,
  CharacterResponsiveTableComponent,
  BackgroundResponsiveTableComponent,
  FeatResponsiveTableComponent,
  SpellResponsiveTableComponent,
  SubclassResponsiveTableComponent,
  RaceResponsiveTableComponent
} from './responsive-table/responsive-table.component';

@NgModule({
  declarations: [
    BackgroundResponsiveTableComponent,
    CharacterResponsiveTableComponent,
    FeatResponsiveTableComponent,
    FilterModalComponent,
    ItemResponsiveTableComponent,
    RaceResponsiveTableComponent,
    ReputationModalComponent,
    ResponsiveTableComponent,
    SpellResponsiveTableComponent,
    SubclassResponsiveTableComponent,
    TerritoriesModalComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    BackgroundResponsiveTableComponent,
    CharacterResponsiveTableComponent,
    FeatResponsiveTableComponent,
    FilterModalComponent,
    ItemResponsiveTableComponent,
    RaceResponsiveTableComponent,
    ReputationModalComponent,
    ResponsiveTableComponent,
    SpellResponsiveTableComponent,
    SubclassResponsiveTableComponent,
    TerritoriesModalComponent
  ]
})
export class SharedModule {}
