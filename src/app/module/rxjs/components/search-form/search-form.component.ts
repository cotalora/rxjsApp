import { Component, ElementRef, ViewChild, Output, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Subscription, debounceTime, distinctUntilChanged, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'main-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {

  @Output() public searchValue = new EventEmitter<string>();
  @ViewChild('searchInput', { static: true }) public searchInput!: ElementRef;

  private isSearchInputFocused: boolean = false;
  private inputFocusSubscription: Subscription = new Subscription();
  private inputBlurSubscription: Subscription = new Subscription();
  private inputKeyUpSubscription: Subscription = new Subscription();
  private inputValueSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.inputFocusSubscription = fromEvent(this.searchInput.nativeElement, 'focus').subscribe(() => {
      this.isSearchInputFocused = true;
    });

    this.inputBlurSubscription = fromEvent(this.searchInput.nativeElement, 'blur').subscribe(() => {
      this.isSearchInputFocused = false;
    });

    this.inputKeyUpSubscription = fromEvent<KeyboardEvent>(document, 'keyup').pipe(
      map(({ key }) => key)
    ).subscribe((key: string) => this.focusInput(key));

    this.inputValueSubscription = fromEvent<InputEvent>(this.searchInput.nativeElement, 'input').pipe(
      debounceTime(300),
      map(event => (event.target as HTMLInputElement).value),
      distinctUntilChanged(),
    ).subscribe((value: string) => this.emitInputValue(value));
  }

  ngOnDestroy(): void {
    this.inputFocusSubscription.unsubscribe();
    this.inputBlurSubscription.unsubscribe();
    this.inputKeyUpSubscription.unsubscribe();
    this.inputValueSubscription.unsubscribe();
  }

  private focusInput(key: string) {
    if (key.toLowerCase() !== 's') return;
    if (this.isSearchInputFocused) return;
    
    this.searchInput.nativeElement.focus();
  }

  private emitInputValue(value: string) { this.searchValue.emit(value); }
}
