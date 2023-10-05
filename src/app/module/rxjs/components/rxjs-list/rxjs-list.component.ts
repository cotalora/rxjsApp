import { AUTO_STYLE, animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { rxjsList } from 'src/app/constants/rxjs-list';
import { RxjsItem } from 'src/app/interfaces/rxjs-item.interface';

@Component({
  selector: 'main-rxjs-list',
  templateUrl: './rxjs-list.component.html',
  styleUrls: ['./rxjs-list.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(100 + 'ms ease-in')),
      transition('true => false', animate(100 + 'ms ease-out'))
    ])
  ]
})
export class RxjsListComponent implements OnChanges {

  @Input() public searchValue: string = '';
  
  public rxjsList: RxjsItem[] = [];
  public thereAreNoElements: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchValue']) this.filterList(this.searchValue);
  }

  private filterList(filterBy: string) {
    if (filterBy === '') {
      this.rxjsList = [];
      this.thereAreNoElements = false;
      return;
    }
    
    const filterByUpperCase = filterBy.toUpperCase().trim();
    this.rxjsList = [...rxjsList].filter(item => item.name.toUpperCase().includes(filterByUpperCase));

    this.thereAreNoElements = filterBy !== '' && this.rxjsList.length === 0;
  }
}
