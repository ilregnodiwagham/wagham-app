import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EnumDictionary, Territories } from 'src/app/shared/common-enums.model';

@Component({
  selector: 'app-reputation-modal',
  templateUrl: './reputation-modal.component.html',
  styleUrls: ['./reputation-modal.component.scss'],
})
export class ReputationModalComponent implements OnInit {
  @Input() characterName: string;
  @Input() reputation: EnumDictionary<Territories, number>[];

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
