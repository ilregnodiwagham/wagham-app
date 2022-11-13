import { ModalController } from '@ionic/angular/providers/modal-controller';
import { BuildingTableRow } from 'src/app/models/building.model';
import { CommandType, TableCommand } from '../command.interface';
import { PrizeModalComponent } from './prize-modal/prize-modal.component';

export class PrizeCommand implements TableCommand<BuildingTableRow> {
  commandName = 'Mostra Premi';
  commandTitle = 'Premi Settimanali';
  commandType = CommandType.button;

  constructor(
    private modalCtrl: ModalController
  ) {}

  execute(row: BuildingTableRow) {
    this.modalCtrl.create({
      component: PrizeModalComponent,
      componentProps: {
        prizes: row.prizes,
        buildingName: row.name
      }
    }).then( (modal) => {
      modal.present();
    });
  }

}
