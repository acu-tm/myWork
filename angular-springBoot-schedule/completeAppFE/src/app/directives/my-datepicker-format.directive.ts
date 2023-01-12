import { Directive } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter} from "@angular/material/core";
import * as moment from "moment";

// extend NativeDateAdapter's format method to specify the date format.
export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: object): string {
    let faDate = moment(date.toDateString()).locale('en').format('dd DD MMMM YYYY');
    return faDate;
  }
}

const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
}

export const CUSTOM_DATE_FORMATS = {
  parse: {
    // date format in which a user enter date manually
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    // date format in which Datepicker displays the date in input box. Either date can be selected from calendar or date can be entered manually
    dateInput: 'MMMM DD, YYYY',
    //  date format in which calendar displays the month-year label
    monthYearLabel: 'MMMM YYYY',
    // A11 properties are related to Accessibility
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Directive({
  selector: '[appMyDatepickerFormat]',
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class MyDatepickerFormatDirective {

  constructor() { }

}
