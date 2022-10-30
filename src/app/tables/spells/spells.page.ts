/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Spell, SpellTableRow } from 'src/app/models/spell.model';
import { SpellService } from 'src/app/services/spell.service';
import { LinkCommand } from 'src/app/shared/commands/url-command/link-command';
import { WaghamLoadingController } from 'src/app/shared/wagham-loading-controller';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.page.html',
  styleUrls: ['./spells.page.scss'],
})
export class SpellsPage implements OnInit, OnDestroy {

  spells: SpellTableRow[] = null;
  readonly pageSize = 50;
  readonly sortOptions = {
    'Nome (A-Z)': { sortKey: 'name', sortOrder: 1},
    'Nome (Z-A)': { sortKey: 'name', sortOrder: -1}
  };
  readonly filterOptions = ['school', 'dndClass', 'manual', 'ritual'];
  readonly searchFields = ['name'];
  readonly commands = [
    new LinkCommand()
  ];
  private spellsSubscription: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private spellService: SpellService,
    private loadingCtrl: WaghamLoadingController
  ) { }

  ngOnDestroy(): void {
   this.spellsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loadingCtrl.create().then( loading => {
      loading.present();
      this.spellsSubscription = this.spellService.spells
      .subscribe(
        (spells: Spell[]) => {
          this.spells = spells.map( it => it.toTableRow());
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
