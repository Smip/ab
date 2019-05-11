import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxMaterialize} from '@smip/ngx-materialize';
import {LayoutsModule} from './layouts/layouts.module';
import {MomentPipe} from './pipes/moment.pipe';
import {LoaderComponent} from './components/loader/loader.component';

@NgModule({
  declarations: [MomentPipe, LoaderComponent],
  imports: [
    CommonModule,
    LayoutsModule,
  ],
  exports: [
    NgxMaterialize,
    MomentPipe,
    LoaderComponent,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {ngModule: SharedModule};
  }
}
