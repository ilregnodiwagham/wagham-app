import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Prize } from 'src/app/models/building.model';

@Component({
  selector: 'app-prize-modal',
  templateUrl: './prize-modal.component.html',
  styleUrls: ['./prize-modal.component.scss'],
})
export class PrizeModalComponent implements OnInit {
  @Input() prizes: Prize[];
  @Input() buildingName: string;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
