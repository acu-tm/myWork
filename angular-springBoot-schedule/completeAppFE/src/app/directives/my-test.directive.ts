import { Directive } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter} from "@angular/material/core";


export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {

    if (displayFormat === 'input') {

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    }

    return date.toDateString();
  }
}

export const APP_DATE_FORMATS =
  {
    parse: {
      dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
      // dateInput: 'input',
      dateInput: { day: 'numeric', month: 'long', year: 'numeric' },
      monthYearLabel: { year: 'numeric', month: 'numeric' },
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
      monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
  };

@Directive({
  selector: '[appMyTestDirective]',
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class MyTestDirective {

  constructor() { }

}
