import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { ResponsiveTableComponent, ItemResponsiveTableComponent } from './responsive-table/responsive-table.component';

@NgModule({
  declarations: [ResponsiveTableComponent, ItemResponsiveTableComponent, FilterModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [ResponsiveTableComponent, ItemResponsiveTableComponent, FilterModalComponent]
})
export class SharedModule {}
