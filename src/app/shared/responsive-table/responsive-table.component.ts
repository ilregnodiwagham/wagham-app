import { Component, Input, OnDestroy, OnInit, HostListener } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ItemTableRow } from 'src/app/models/items.model';
import { CommandType, TableCommand } from '../commands/command.interface';
import { deepEquality } from '../deep-equality';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { BackgroundTableRow } from '../../models/background.model';
import { CharacterTableRow } from '../../models/characterWithPlayer.model';
import { FeatTableRow } from '../../models/feat.model';
import { PaginatedTable } from '../paginated-table/paginated-table';
import { TableRow } from '../paginated-table/table-row';
import { FilterOption, SortOption } from '../paginated-table/transforms';
import { updateSet } from '../utils';
import { SpellTableRow } from 'src/app/models/spell.model';
import { SubclassTableRow } from 'src/app/models/subclass.model';

@Component({
  selector: 'app-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class ResponsiveTableComponent<T extends TableRow> implements OnInit, OnDestroy {
  @Input() data: T[];
  @Input() sortOptions: {[key: string]: SortOption};
  @Input() filterOptions: string[];
  @Input() pageSize: number;
  @Input() searchFields: string[];
  @Input() commands: TableCommand<TableRow>[];
  readonly commandType = CommandType;
  hiddenCommands = [];
  visibleCommands = [];
  table: PaginatedTable<T>;
  pageSubscription: Subscription;
  pageData: T[];
  visibleKeys: string[] = [];
  hiddenKeys: string[] = [];
  header: {[key: string]: string} = {};
  colLimit: number;
  visibleInfo: boolean[];
  filterValues: { [key: string]: Set<string> };

  defaultSortOption: SortOption | null = null;
  selectedSortOption: SortOption | null = null;

  selectedFilterOption: FilterOption | null = null;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private platform: Platform
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeColumns(window.innerWidth);
  }

  ngOnInit(): void {
    if (!!this.data && this.data.length > 0) {

      const reduceStart = this.filterOptions
        .reduce<{[key: string]: Set<string>}>( (previous, current) =>
          ({...previous, [current]: new Set<string>()}),
          {});
      this.filterValues = this.data.reduce( (previous, current) =>
        this.filterOptions.reduce( (p, field) => ({
            ...p,
            [field]: updateSet<string>(p[field], current.getValuesForFiltering(field))
          }), previous)
        , reduceStart
      );

      this.defaultSortOption = Object.keys(this.sortOptions).length > 0
        ? this.sortOptions[Object.keys(this.sortOptions)[0]]
        : null;

      this.table = new PaginatedTable(this.data, this.pageSize);
      this.header = this.table.header;
      this.visibleInfo = new Array(this.data.length).fill(false);
      this.pageSubscription = this.table.page.subscribe( data => {
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
    this.visibleKeys = this.table.keys.splice(0, this.colLimit);
    this.hiddenKeys = this.table.keys.splice(this.colLimit, this.table.keys.length);
    if ((this.visibleKeys.length + this.commands.length) > this.colLimit) {
      this.hiddenCommands = [...this.commands];
      this.visibleCommands = [];
    } else {
      this.hiddenCommands = [];
      this.visibleCommands = [...this.commands];
    }
  }

  loadData(event): void {
    this.table.loadMore();
    event.target.complete();
    event.target.disabled = this.table.finished;
  }

  toggleInfo(index: number): void {
    if (this.hiddenKeys.length > 0 || this.hiddenCommands.length > 0) {
      this.visibleInfo[index] = !this.visibleInfo[index];
    }
  }

  onChange(target: EventTarget): void {
    const value = (target as HTMLIonInputElement).value as string;
    this.table.search(value, this.searchFields);
  }

  createButtons(): ActionSheetButton<SortOption | null>[] {
    const generatedButtons = Object.keys(this.sortOptions)
      .reduce((previous, current) => [
          ...previous,
          {
            text: current,
            role: !!this.selectedSortOption && deepEquality(this.selectedSortOption, this.sortOptions[current])
              ? 'selected'
              : 'option',
            data: this.sortOptions[current]
          }
        ],
      []);
    return [
      ...generatedButtons,
      {
        text: 'Reset',
        role: 'option',
        data: this.defaultSortOption
      },
      {
        text: 'Annulla',
        role: 'cancel'
      }
    ];
  }

  sortSheetOpen(): void {
    this.actionSheetCtrl.create({
      header: 'Ordina per',
      buttons: this.createButtons(),
      backdropDismiss: true
    }).then( (actionSheet) => {
      actionSheet.present();
      actionSheet.onDidDismiss<SortOption>()
        .then( (sortData) => {
          if (sortData.role !== 'cancel' && sortData.role !== 'backdrop') {
            this.selectedSortOption = sortData.data;
            this.table.sort(sortData.data);
          }
        });
    });
  }

  filterModalOpen(): void {
    this.modalCtrl.create({
      component: FilterModalComponent,
      componentProps: {
        filterOptions: this.filterValues,
        columnHeader: this.header,
        currentFilterField: !!this.selectedFilterOption ? this.selectedFilterOption.filterField : null,
        currentFilterValue: !!this.selectedFilterOption ? this.selectedFilterOption.filterValue : null,
      }
    }).then( modal => {
      modal.present();
      modal.onDidDismiss<FilterOption>().then( (modalData) => {
        if (modalData.role === 'confirm') {
          this.selectedFilterOption = modalData.data;
          this.table.filter(modalData.data);
        }
      });
    });
  }
}

@Component({
  selector: 'app-item-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class ItemResponsiveTableComponent extends ResponsiveTableComponent<ItemTableRow> {}

@Component({
  selector: 'app-character-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class CharacterResponsiveTableComponent extends ResponsiveTableComponent<CharacterTableRow> {}

@Component({
  selector: 'app-background-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class BackgroundResponsiveTableComponent extends ResponsiveTableComponent<BackgroundTableRow> {}

@Component({
  selector: 'app-feat-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class FeatResponsiveTableComponent extends ResponsiveTableComponent<FeatTableRow> {}

@Component({
  selector: 'app-spell-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class SpellResponsiveTableComponent extends ResponsiveTableComponent<SpellTableRow> {}

@Component({
  selector: 'app-subclass-responsive-table',
  templateUrl: './responsive-table.component.html',
  styleUrls: ['./responsive-table.component.scss'],
})
export class SubclassResponsiveTableComponent extends ResponsiveTableComponent<SubclassTableRow> {}
