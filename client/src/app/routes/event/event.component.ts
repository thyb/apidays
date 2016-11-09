import { Component, Injectable, OnInit, AfterViewInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve } from '@angular/router';

import { ApidaysEvent, EventService, SlugPipe, MenuLink } from '../../shared'

@Injectable()
export class EventResolver implements Resolve<ApidaysEvent> {
  constructor(private eventService: EventService) {}

  resolve(route: ActivatedRouteSnapshot):Promise<ApidaysEvent> {
    return this.eventService.get(route.params['slug'])
  }
}

declare var $:any;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [EventService]
})
export class EventComponent implements OnInit, AfterViewInit {
  private selectedSlug: string
  
  event: ApidaysEvent;
  placePhoto: any;
  //placePhoto: 

  links: Array<MenuLink> = []

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.data.forEach((data: { event: ApidaysEvent }) => {
      this.event = data.event
      this.placePhoto = this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.6)
  ), url(${this.event.place.photo})`);

      this.sortArray(this.event.speakers, 'event_speaker');
      this.sortArray(this.event.sponsors, 'event_sponsor');
      this.sortArray(this.event.organizers, 'event_organizers');

      this._initLinks()
    })
  }

  sortArray(array: Array<any>, relationTable:string):void {
    if (array && array.length && array[0][relationTable]) {
      array.sort((a, b) => {
        if (a[relationTable].order > b[relationTable].order) {
          return 1
        }
        if (a[relationTable].order < b[relationTable].order) {
          return -1
        }
        return 0
      })
    }
  }

  ngAfterViewInit() {
    $('body').scrollTop(0)
  }

  private _initLinks() {
    let links = [{
      icon: 'angle-left',
      text: 'APIdays',
      link: '/',
      tooltip: 'Back to the list of event'
    }, {
      text: 'Conference',
      scroll: 'home',
      active: true
    }, {
      text: 'Location',
      scroll: 'place',
    }]

    if (this.event && this.event.speakers && this.event.speakers.length) {
      links.push({
        text: 'Speakers',
        scroll: 'speakers'
      })
    }

    if (this.event && this.event.sponsors && this.event.sponsors.length) {
      links.push({
        text: 'Sponsors',
        scroll: 'sponsors',
      })
    }
    
    if (this.event && this.event.partners && this.event.partners.length) {
      links.push({
        text: 'Partners',
        scroll: 'partners'
      })
    }

    if (this.event && this.event.organizers && this.event.organizers.length) {
      links.push({
        text: 'Organizers',
        scroll: 'organizers',
      })
    }
    this.links = links;
  }
}
