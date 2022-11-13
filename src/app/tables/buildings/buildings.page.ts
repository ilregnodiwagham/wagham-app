/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Building, BuildingTableRow } from 'src/app/models/building.model';
import { BuildingService } from 'src/app/services/building.service';
import { PrizeCommand } from 'src/app/shared/commands/prize-command/prize-commands';
import { WaghamLoadingController } from 'src/app/shared/wagham-loading-controller';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.page.html',
  styleUrls: ['./buildings.page.scss'],
})
export class BuildingsPage implements OnInit, OnDestroy {

  buildings: BuildingTableRow[] = null;
  readonly pageSize = 50;
  readonly sortOptions = {
    'Nome (A-Z)': { sortKey: 'name', sortOrder: 1},
    'Nome (Z-A)': { sortKey: 'name', sortOrder: -1},
    'Costo (più costoso)': { sortKey: 'cost', sortOrder: -1},
    'Costo (meno costoso)': { sortKey: 'cost', sortOrder: 1}
  };
  readonly filterOptions = ['areas'];
  readonly searchFields = ['name'];
  readonly commands = [
    new PrizeCommand(this.modalCtrl)
  ];
  private buildingsSubscription: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private buildingService: BuildingService,
    private loadingCtrl: WaghamLoadingController,
    private modalCtrl: ModalController
  ) { }

  ngOnDestroy(): void {
   this.buildingsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loadingCtrl.create().then( loading => {
      loading.present();
      this.buildingsSubscription = this.buildingService.buildings
      .subscribe(
        (buildings: Building[]) => {
          this.buildings = buildings.map( it => it.toTableRow());
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
