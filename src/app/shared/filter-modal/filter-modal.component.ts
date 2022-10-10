import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {
  @Input() sortFields: string[];
  @Input() sortNames: {[key: string]: string};
  @Input() activeSortField: string | null;
  @Input() activeSortOrder: number | null;
  sortBadges: number[];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.sortBadges = new Array(this.sortFields.length).fill(0);
    if (!!this.activeSortOrder && !!this.activeSortField && this.sortFields.indexOf(this.activeSortField) >= 0) {
      this.sortBadges[this.sortFields.indexOf(this.activeSortField)] = this.activeSortOrder;
    }
  }

  sortField(field: string, index: number): void {
    if (this.sortBadges[index] === 0) {
      this.sortBadges = new Array(this.sortFields.length).fill(0);
      this.sortBadges[index] = 1;
    } else {
      this.sortBadges[index] *= -1;
    }
    this.activeSortField = field;
    this.activeSortOrder = this.sortBadges[index];
  }

  sortReset(): void {
    this.sortBadges = new Array(this.sortFields.length).fill(0);
    this.activeSortField = null;
    this.activeSortOrder = null;
  }

  onCancel(): void {
    this.modalCtrl.dismiss({sortOptions: null}, 'cancel');
  }

  onAccept(): void {
    this.modalCtrl.dismiss({
      sortOptions: {
        sortFields: this.activeSortField,
        sortOrder: this.activeSortOrder
      }
    }, 'confirm');
  }

}
