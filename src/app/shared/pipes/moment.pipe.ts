import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';


@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {

  transform(value: string, formatTo: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return moment.utc(value).local().format(formatTo);
  }

}
