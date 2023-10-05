import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'rxjs',
    loadChildren: () => import('./module/rxjs/rxjs.module').then(m => m.RxjsModule)
  },
  { path: '**', redirectTo: 'rxjs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
