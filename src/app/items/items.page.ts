import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginatedTable } from '../shared/table-classes.model';
import { Item, ItemTableRow } from './items.model';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {
  items: PaginatedTable<ItemTableRow> = null;
  private itemsSubscription: Subscription;

  constructor(
    private itemsService: ItemsService
  ) { }

  ngOnDestroy(): void {
   this.itemsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.itemsSubscription = this.itemsService.items
      .subscribe(
        items => {
          this.items = new PaginatedTable(
            items.map( it => it.toTableRow()),
            ['name', 'buyPrice', 'sellPrice'],
            50);
        }
      );
  }

}
