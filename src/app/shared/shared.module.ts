import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PrizeModalComponent } from './commands/prize-command/prize-modal/prize-modal.component';
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
  RaceResponsiveTableComponent,
  BuildingResponsiveTableComponent
} from './responsive-table/responsive-table.component';

@NgModule({
  declarations: [
    BackgroundResponsiveTableComponent,
    BuildingResponsiveTableComponent,
    CharacterResponsiveTableComponent,
    FeatResponsiveTableComponent,
    FilterModalComponent,
    ItemResponsiveTableComponent,
    PrizeModalComponent,
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
    BuildingResponsiveTableComponent,
    CharacterResponsiveTableComponent,
    FeatResponsiveTableComponent,
    FilterModalComponent,
    ItemResponsiveTableComponent,
    PrizeModalComponent,
    RaceResponsiveTableComponent,
    ReputationModalComponent,
    ResponsiveTableComponent,
    SpellResponsiveTableComponent,
    SubclassResponsiveTableComponent,
    TerritoriesModalComponent
  ]
})
export class SharedModule {}
