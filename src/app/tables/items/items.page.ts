/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WaghamLoadingController } from '../../shared/wagham-loading-controller';
import { Item, ItemTableRow } from '../../models/items.model';
import { ItemService } from 'src/app/services/item.service';
import { LinkCommand } from 'src/app/shared/commands/url-command/link-command';
import { AlertController } from '@ionic/angular';
import { BotCommand } from 'src/app/shared/commands/bot-command';

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
  readonly searchFields = ['name'];
  readonly commands = [
    new BotCommand('use', 'Utilizza sul BOT', false, false, false, false, true),
    new BotCommand('craft', 'Craft sul BOT', false, true, false, false, false),
    new BotCommand('buy', 'Acquista dal BOT', false, false, true, false, false),
    new BotCommand('sell', 'Vendi al BOT', false, false, false, true, false),
    new BotCommand('give', 'Dona ad altro PG', true, false, false, false, false),
    new LinkCommand()
  ];
  private itemsSubscription: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private itemsService: ItemService,
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
        (items: Item[]) => {
          this.items = items.map( it => it.toTableRow());
          loading.dismiss();
        },
        (error) => {
          loading.dismiss();
          this.alertCtrl.create({
            header: 'Oops!',
            subHeader: 'Qualcuno ha lanciato Sciame di Meteore su questa pagina',
            message: error,
            buttons: [
              {
                text: 'Ok',
                role: 'confirm',
              },
            ]
          }).then( (errorAlert) => {
            errorAlert.present();
          });
        }
      );
    });
  }
}
