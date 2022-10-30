/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Subclass, SubclassTableRow } from 'src/app/models/subclass.model';
import { SubclassService } from 'src/app/services/subclass.service';
import { LinkCommand } from 'src/app/shared/commands/url-command/link-command';
import { WaghamLoadingController } from 'src/app/shared/wagham-loading-controller';

@Component({
  selector: 'app-subclasses',
  templateUrl: './subclasses.page.html',
  styleUrls: ['./subclasses.page.scss'],
})
export class SubclassesPage implements OnInit, OnDestroy {

  subclasses: SubclassTableRow[] = null;
  readonly pageSize = 50;
  readonly sortOptions = {
    'Nome (A-Z)': { sortKey: 'name', sortOrder: 1},
    'Nome (Z-A)': { sortKey: 'name', sortOrder: -1}
  };
  readonly filterOptions = ['dndClass', 'race', 'manual', 'territory'];
  readonly searchFields = ['name'];
  readonly commands = [
    new LinkCommand()
  ];
  private subclassesSubscription: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private subclassService: SubclassService,
    private loadingCtrl: WaghamLoadingController
  ) { }

  ngOnDestroy(): void {
   this.subclassesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loadingCtrl.create().then( loading => {
      loading.present();
      this.subclassesSubscription = this.subclassService.subclasses
      .subscribe(
        (subclass: Subclass[]) => {
          this.subclasses = subclass.map( it => it.toTableRow());
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
