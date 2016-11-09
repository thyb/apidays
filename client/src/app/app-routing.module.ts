import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, HomeResolver } from './routes/home/home.component';
import { EventComponent, EventResolver } from './routes/event/event.component';
import { EventService } from './shared'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      events: HomeResolver
    }
  },
  {
    path: 'events/:slug',
    component: EventComponent,
    resolve: {
      event: EventResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HomeResolver, EventResolver]
})
export class ApidaysRoutingModule { }
