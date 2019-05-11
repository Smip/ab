import {animate, state, style, transition, trigger} from '@angular/animations';

export const slideStateTrigger = trigger('slide', [
  state('opened',
    style({
      height: '*',
    }),
  ),
  state('closed',
    style({
      height: '50px',
    }),
  ),
  transition('opened <=> closed', animate('1s')),
]);
