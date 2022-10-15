import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PickerColumnOption, PickerController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent {
  @Input() filterOptions: { [key: string]: Set<string> };
  @Input() columnHeader: { [key: string]: string };
  @Input() currentFilterField: string | null = null;
  @Input() currentFilterValue: string | null = null;

  constructor(
    private modalCtrl: ModalController,
    private pickerCtrl: PickerController
  ) {  }

  onCancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onAccept(): void {
    if (!!this.currentFilterField && !!this.currentFilterValue) {
      this.modalCtrl.dismiss({
        filterField: this.currentFilterField,
        filterValue: this.currentFilterValue
      }, 'confirm');
    } else {
      this.modalCtrl.dismiss(null, 'confirm');
    }
  }

  onReset(): void {
    this.currentFilterField = null;
    this.currentFilterValue = null;
    this.modalCtrl.dismiss(null, 'confirm');
  }

  getOptions(field: string): PickerColumnOption[] {
    return Array.from(this.filterOptions[field]).reduce(
      (previous, current) => [
        ...previous,
        {
            text: current,
            value: current
        }
      ], []
    );
  }

  filterField(field: string): void {
    this.pickerCtrl.create({
      columns: [{
        name: field,
        options: this.getOptions(field)
      }],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value) => {
            this.currentFilterField = field;
            this.currentFilterValue = value[field].value;
          }
        }
      ]
    }).then( (picker) => {
      picker.present();
    });
  }

}
