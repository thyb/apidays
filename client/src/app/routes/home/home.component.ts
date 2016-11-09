import { Component, Injectable, OnInit } from '@angular/core';

import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { EventService, ApidaysEvent } from '../../shared'

@Injectable()
export class HomeResolver implements Resolve<Array<ApidaysEvent>> {
  constructor(private eventService: EventService) {}

  resolve():Promise<Array<ApidaysEvent>> {
    return this.eventService.list()
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Array<ApidaysEvent>

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.forEach((data: { events: Array<ApidaysEvent> }) => {
      this.events = data.events;
    });
  }

}
