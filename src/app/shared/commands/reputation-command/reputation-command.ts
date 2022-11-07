import { ModalController } from '@ionic/angular';
import { CharacterTableRow } from '../../../models/characterWithPlayer.model';
import { CommandType, TableCommand } from '../command.interface';
import { ReputationModalComponent } from './reputation-modal/reputation-modal.component';

export class ShowReputationCommand implements TableCommand<CharacterTableRow> {
  commandName = 'Reputazione';
  commandTitle = 'Reputazione';
  commandType = CommandType.button;

  constructor(
    private modalCtrl: ModalController
  ) {}

  execute(row: CharacterTableRow): void {
    this.modalCtrl.create({
      component: ReputationModalComponent,
      componentProps: {
        characterName: row.name,
        reputation: row.reputation
      }
    }).then( (modal) => {
      modal.present();
    });
  }

}
