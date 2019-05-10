import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WrapperComponent} from './shared/layouts/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {path: '', loadChildren: './index/index.module#IndexModule'},
      {path: '**', loadChildren: './not-found/not-found.module#NotFoundModule'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
