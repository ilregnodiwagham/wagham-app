import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { ItemResponsiveTableComponent } from './responsive-table/responsive-table.component';

@NgModule({
  declarations: [ItemResponsiveTableComponent, FilterModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [ItemResponsiveTableComponent, FilterModalComponent]
})
export class SharedModule {}
