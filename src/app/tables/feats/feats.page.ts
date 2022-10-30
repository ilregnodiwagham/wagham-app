/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeatService } from 'src/app/services/feat.service';
import { LinkCommand } from 'src/app/shared/commands/url-command/link-command';
import { Feat, FeatTableRow } from 'src/app/models/feat.model';
import { WaghamLoadingController } from 'src/app/shared/wagham-loading-controller';

@Component({
  selector: 'app-feats',
  templateUrl: './feats.page.html',
  styleUrls: ['./feats.page.scss'],
})
export class FeatsPage implements OnInit, OnDestroy {

  feats: FeatTableRow[] = null;
  readonly pageSize = 50;
  readonly sortOptions = {
    'Nome (A-Z)': { sortKey: 'name', sortOrder: 1},
    'Nome (Z-A)': { sortKey: 'name', sortOrder: -1}
  };
  readonly filterOptions = ['race', 'asi', 'source'];
  readonly searchFields = ['name'];
  readonly commands = [
    new LinkCommand()
  ];
  private featsSubscription: Subscription;

  constructor(
    private featService: FeatService,
    private loadingCtrl: WaghamLoadingController
  ) { }

  ngOnDestroy(): void {
   this.featsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loadingCtrl.create().then( loading => {
      loading.present();
      this.featsSubscription = this.featService.feats
      .subscribe(
        (feats: Feat[]) => {
          this.feats = feats.map( it => it.toTableRow());
          loading.dismiss();
        }
      );
    });
  }


}
