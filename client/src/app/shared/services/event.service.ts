import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ApidaysEvent } from '../models'

import { environment } from '../../../environments/environment'

@Injectable()
export class EventService {
  private endpoints = {
    list: 'events',
    get: 'events/:slug'
  }

  private apiUrl = environment.apiUrl

  constructor(private http: Http) { }

  list(): Promise<ApidaysEvent[]> {
    return this.http.get(this.apiUrl + this.endpoints.list).toPromise()
      .then(response => {
        return response.json().rows as Event[]
      })
      .catch(err => {
        console.log(err);
      })
  }

  get(slug: string): Promise<ApidaysEvent> {
    return this.http
      .get(this.apiUrl + this.endpoints.get.replace(':slug', slug))
      .toPromise()
      .then(response => {
        return response.json() as Event
      })
      .catch(err => {
        console.log(err)
      })
  }
}
