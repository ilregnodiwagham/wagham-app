import { Component, Input, OnDestroy, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ItemTableRow } from 'src/app/items/items.model';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { PaginatedTable, TableRow, Tabulable } from '../table-classes.model';

const viewportCols = {
  400: 2,
  700: 3,
  900: 4,
  1280: 5,
  1920: 7
};

@Component({
  selector: 'app-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class ResponsiveTableComponent<T extends TableRow> implements OnInit, OnDestroy {
  @Input() data: PaginatedTable<T>;
  pageSubscription: Subscription;
  pageData: T[];
  visibleKeys: string[] = [];
  hiddenKeys: string[] = [];
  header: {[key: string]: string} = {};
  colLimit: number;
  visibleInfo: boolean[];

  constructor(
    private modalCtrl: ModalController,
    private platform: Platform
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeColumns(window.innerWidth);
  }

  ngOnInit(): void {
    if (!!this.data && this.data.length > 0) {
      this.header = this.data.header;
      this.visibleInfo = new Array(this.data.length).fill(false);
      this.pageSubscription = this.data.page.subscribe( data => {
        this.pageData = data;
      });
      this.resizeColumns(this.platform.width());
    }

  }

  ngOnDestroy(): void {
    if (!!this.pageSubscription) {this.pageSubscription.unsubscribe();}
  }

  resizeColumns(width: number): void {
    if (width >= 1920) {
      this.colLimit = 7;
    } else if (width > 1280) {
      this.colLimit = 5;
    } else if (width > 900) {
      this.colLimit = 4;
    } else if (width > 700) {
      this.colLimit = 3;
    } else {
      this.colLimit = 2;
    }
    this.visibleKeys = this.data.keys.splice(0, this.colLimit);
    this.hiddenKeys = this.data.keys.splice(this.colLimit, this.data.keys.length);
  }

  loadData(event): void {
    this.data.loadMore();
    event.target.complete();
    event.target.disabled = this.data.finished;
  }

  toggleInfo(index: number): void {
    this.visibleInfo[index] = !this.visibleInfo[index];
  }

  onChange(value: string): void {
    this.data.search(value, ['name']);
  }

  filterModalOpen(): void {
    this.modalCtrl.create({
      component: FilterModalComponent,
      componentProps: {sortFields: this.data.sortFields, sortNames: this.data.header}
    }).then( modal => {
      modal.present();
    });
  }

}

@Component({
  selector: 'app-item-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class ItemResponsiveTableComponent extends ResponsiveTableComponent<ItemTableRow> {}
