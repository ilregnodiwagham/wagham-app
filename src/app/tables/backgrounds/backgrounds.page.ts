/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackgroundService } from 'src/app/services/background.service';
import { LinkCommand } from 'src/app/shared/commands/url-command/link-command';
import { Background, BackgroundTableRow } from 'src/app/models/background.model';
import { WaghamLoadingController } from 'src/app/shared/wagham-loading-controller';

@Component({
  selector: 'app-backgrounds',
  templateUrl: './backgrounds.page.html',
  styleUrls: ['./backgrounds.page.scss'],
})
export class BackgroundsPage implements OnInit, OnDestroy {

  backgrounds: BackgroundTableRow[] = null;
  readonly pageSize = 50;
  readonly sortOptions = {
    'Nome (A-Z)': { sortKey: 'name', sortOrder: 1},
    'Nome (Z-A)': { sortKey: 'name', sortOrder: -1}
  };
  readonly filterOptions = ['race'];
  readonly searchFields = ['name'];
  readonly commands = [
    new LinkCommand()
  ];
  private backgroundsSubscription: Subscription;

  constructor(
    private backgroundService: BackgroundService,
    private loadingCtrl: WaghamLoadingController
  ) { }

  ngOnDestroy(): void {
   this.backgroundsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loadingCtrl.create().then( loading => {
      loading.present();
      this.backgroundsSubscription = this.backgroundService.backgrounds
      .subscribe(
        (backgrounds: Background[]) => {
          this.backgrounds = backgrounds.map( it => it.toTableRow());
          loading.dismiss();
        }
      );
    });
  }

}
