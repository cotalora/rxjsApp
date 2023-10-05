import { trigger, state, transition, style, animate, AUTO_STYLE } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(2000, style({opacity: 1}))
      ]) 
    ])
  ]
})
export class MainComponent {

  @ViewChild('list', { static: true }) list!: ElementRef;

  public searchValue: string = '';

  public onSearchValue(value: string) { this.searchValue = value; }
}
