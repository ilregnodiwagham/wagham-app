import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-territories-modal',
  templateUrl: './territories-modal.component.html',
  styleUrls: ['./territories-modal.component.scss'],
})
export class TerritoriesModalComponent implements OnInit {
  @Input() raceName: string;
  @Input() subraceName: string;
  @Input() territories: { [key: string]: string};

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  visitUrl(url: string) {
    Browser.open({ url });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

}
