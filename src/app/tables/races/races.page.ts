/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Race, RaceTableRow } from 'src/app/models/race.model';
import { RaceService } from 'src/app/services/race.service';
import { ShowTerritoriesCommand } from 'src/app/shared/commands/territories-command/territories-command';
import { LinkCommand } from 'src/app/shared/commands/url-command/link-command';
import { WaghamLoadingController } from 'src/app/shared/wagham-loading-controller';

@Component({
  selector: 'app-races',
  templateUrl: './races.page.html',
  styleUrls: ['./races.page.scss'],
})
export class RacesPage implements OnInit, OnDestroy {
  races: RaceTableRow[] = null;
  readonly pageSize = 50;
  readonly sortOptions = {
    'Nome (A-Z)': { sortKey: 'race', sortOrder: 1},
    'Nome (Z-A)': { sortKey: 'race', sortOrder: -1}
  };
  readonly filterOptions = ['race', 'territories'];
  readonly searchFields = ['name', 'subrace'];
  readonly commands = [
    new ShowTerritoriesCommand(this.modalCtrl),
    new LinkCommand()
  ];
  private racesSubscription: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private raceService: RaceService,
    private loadingCtrl: WaghamLoadingController
  ) { }

  ngOnDestroy(): void {
   this.racesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loadingCtrl.create().then( loading => {
      loading.present();
      this.racesSubscription = this.raceService.races
      .subscribe(
        (races: Race[]) => {
          this.races = races.map( it => it.toTableRow());
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
