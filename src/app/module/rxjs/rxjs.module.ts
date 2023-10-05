import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxjsRoutingModule } from './rxjs-routing.module';
import { MainComponent } from './pages/main/main.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { RxjsListComponent } from './components/rxjs-list/rxjs-list.component';


@NgModule({
  declarations: [
    MainComponent,
    SearchFormComponent,
    RxjsListComponent
  ],
  imports: [
    CommonModule,
    RxjsRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RxjsModule { }
