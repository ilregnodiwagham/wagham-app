import { ModalController } from '@ionic/angular';
import { RaceTableRow } from 'src/app/models/race.model';
import { CommandType, TableCommand } from '../command.interface';
import { TerritoriesModalComponent } from './territories-modal/territories-modal.component';

export class ShowTerritoriesCommand implements TableCommand<RaceTableRow> {
  commandName = 'Mostra';
  commandTitle = 'Territorio';
  commandType = CommandType.button;

  constructor(
    private modalCtrl: ModalController
  ) {}

  execute(row: RaceTableRow): void {
    this.modalCtrl.create({
      component: TerritoriesModalComponent,
      componentProps: {
        raceName: row.race,
        subraceName: row.subrace,
        territories: row.territories
      }
    }).then( (modal) => {
      modal.present();
    });
  }

}
