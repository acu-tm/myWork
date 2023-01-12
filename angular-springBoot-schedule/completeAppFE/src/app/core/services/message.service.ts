import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  //  hold the current value of the message
  private messageSource = new BehaviorSubject<any>(moment());

  // handle data stream as observable to be used by components
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  // function to call next on message source to update its value
  changeMessage(message: MatDatepickerInputEvent<any | null>){
    this.messageSource.next(message)
  }
}
