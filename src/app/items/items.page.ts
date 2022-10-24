/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WaghamLoadingController } from '../shared/wagham-loading-controller';
import { Item, ItemTableRow } from '../shared/models/items.model';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit, OnDestroy {
  items: ItemTableRow[] = null;
  readonly pageSize = 50;
  readonly sortOptions = {
    'Nome (A-Z)': { sortKey: 'name', sortOrder: 1},
    'Nome (Z-A)': { sortKey: 'name', sortOrder: -1},
    'Prezzo di vendita (più alto)': { sortKey: 'sellPrice', sortOrder: -1},
    'Prezzo di vendita (più basso)': { sortKey: 'sellPrice', sortOrder: 1},
    'Prezzo di acquisto (più alto)': { sortKey: 'buyPrice', sortOrder: -1},
    'Prezzo di acquisto (più basso)': { sortKey: 'buyPrice', sortOrder: 1}
  };
  readonly filterOptions = ['category', 'manual', 'attunement', 'craftTools'];
  readonly searchFields = ['name']
  private itemsSubscription: Subscription;

  constructor(
    private itemsService: ItemsService,
    private loadingCtrl: WaghamLoadingController
  ) { }

  ngOnDestroy(): void {
   this.itemsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loadingCtrl.create().then( loading => {
      loading.present();
      this.itemsSubscription = this.itemsService.items
      .subscribe(
        items => {
          this.items = items.map( it => it.toTableRow());
          loading.dismiss();
        }
      );
    });
  }
}
