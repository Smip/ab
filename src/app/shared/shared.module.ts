import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxMaterialize} from '@smip/ngx-materialize';
import {LayoutsModule} from './layouts/layouts.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutsModule,
  ],
  exports: [
    NgxMaterialize,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {ngModule: SharedModule};
  }
}
