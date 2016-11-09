import { Component, OnInit, Input } from '@angular/core';

import { ApidaysEvent } from '../../../shared';

@Component({
  selector: 'upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss'],
})
export class UpcomingEventsComponent implements OnInit {
  @Input() events: Array<ApidaysEvent> = []

  ngOnInit() {
    let pastEvents = []
    this.events.forEach((event, i) => {
      let eventDate = new Date(event.date_end).getTime()
      let now = new Date().getTime()
      if (eventDate < now) {
        pastEvents.push(i)
      }
    })
    pastEvents.reverse().forEach(i => {
      this.events.splice(i, 1)
    })
  }
}
