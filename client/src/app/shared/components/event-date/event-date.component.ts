import { Component, OnInit, Input } from '@angular/core';

import { ApidaysEvent } from '../../models'

@Component({
  selector: 'event-date',
  template: `
    <span *ngIf="nbDays >= 0 && nbDays <= 3">
      {{dateStart | date: 'MMMM'}}
      <span *ngFor="let day of getDays(); let i = index">{{day}}<span *ngIf="i < getDays().length - 2">, </span><span *ngIf="i == getDays().length - 2"> & </span></span>, {{dateStart.getFullYear()}}
    </span>
    <span *ngIf="nbDays > 3">
      {{dateStart | date: 'MMMM'}} {{getDays()[0]}} to {{getDays()[1]}}, {{dateStart.getFullYear()}}
    </span>
  `,
  styleUrls: [],
  providers: []
})

export class EventDateComponent implements OnInit {
  private _event: ApidaysEvent;

  dateStart: Date;
  dateEnd: Date;
  nbDays: number;

  text: string;

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'Jully',
    'August',
    'September',
    'November',
    'December'
  ]

  @Input()
  set event(event: ApidaysEvent) {
    if ( ! event ) {
      return;
    }
    this._event = event;

    this.dateStart = new Date(this._event.date_start)
    this.dateStart.setHours(this.dateStart.getHours() + this.dateStart.getTimezoneOffset() / 60);
    this.dateEnd = new Date(this._event.date_end)
    this.dateEnd.setHours(this.dateEnd.getHours() + this.dateEnd.getTimezoneOffset() / 60);
    
    this.nbDays = this._nbDays();
  }
  get event() { return this._event; }

  constructor() {}

  ngOnInit() {
  }

  private _nbDays(): number {
    return Math.round((new Date(this._event.date_end).getTime() - new Date(this._event.date_start).getTime()) / (1000*60*60*24))
  }

  //Restriction: date_start and date_end need to be in the same month to display correctly the date of the event
  getDays():Array<string> {
    if (this.nbDays < 0) {
      return [];
    }

    if (this.nbDays > 3) {
      return [
        this.getOrdinal(this.dateStart.getDate()),
        this.getOrdinal(this.dateEnd.getDate())
      ]
    }

    let result = [],
      i = 0;
    
    for (let i = 0; i < this.nbDays + 1; i++) {
      result[i] = this.getOrdinal(this.dateStart.getDate() + i)
    }
    return result
  }

  getOrdinal(n:number):string {
    let s=["th","st","nd","rd"],
        v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
  }
}
