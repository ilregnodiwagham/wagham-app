/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CharacterTableRow, CharacterWithPlayer } from '../../models/characterWithPlayer.model';
import { ShowReputationCommand } from 'src/app/shared/commands/reputation-command/reputation-command';
import { WaghamLoadingController } from 'src/app/shared/wagham-loading-controller';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit, OnDestroy {
  characters: CharacterTableRow[];
  readonly pageSize = 50;
  readonly sortOptions = {
    'Giocatore (A-Z)': { sortKey: 'player', sortOrder: 1},
    'Giocatore (Z-A)': { sortKey: 'player', sortOrder: -1},
    'Personaggio (A-Z)': { sortKey: 'name', sortOrder: 1},
    'Personaggio (Z-A)': { sortKey: 'name', sortOrder: -1},
    'MS (più alto)': { sortKey: 'ms', sortOrder: -1},
    'MS (più basso)': { sortKey: 'ms', sortOrder: 1},
    'Inattività Giocatore (più alto)': { sortKey: 'playerInactivity', sortOrder: -1},
    'Inattività Giocatore (più basso)': { sortKey: 'playerInactivity', sortOrder: 1},
    'Inattività Master (più alto)': { sortKey: 'masterInactivity', sortOrder: -1},
    'Inattività Master (più basso)': { sortKey: 'masterInactivity', sortOrder: 1}
  };
  readonly filterOptions = ['race', 'dndClass', 'territory'];
  readonly searchFields = ['name', 'player'];
  readonly commands = [
    new ShowReputationCommand(this.modalCtrl)
  ];
  private charactersSubscription: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private characterService: CharacterService,
    private loadingCtrl: WaghamLoadingController,
    private modalCtrl: ModalController
  ) { }

  ngOnDestroy(): void {
    this.charactersSubscription.unsubscribe();
  }

  ngOnInit() {
    this.loadingCtrl.create().then( loading => {
      loading.present();
      this.charactersSubscription = this.characterService.characters
      .subscribe(
        (characters: CharacterWithPlayer[]) => {
          this.characters = characters.map( it => it.toTableRow());
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
