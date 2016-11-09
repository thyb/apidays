import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive, Input, HostBinding } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent, HomeResolver } from './routes/home/home.component';
import { EventComponent, EventResolver } from './routes/event/event.component';
import {ApidaysRoutingModule} from './app-routing.module';

import {
  UpcomingEventsComponent,
  SpeakerComponent,
  EventDateComponent,
  MenuTopComponent,
  MenuLinkComponent,
  SponsorCategoryComponent,
  OrganizersComponent,
  PartnersComponent,
  EventService,
  SlugPipe
} from './shared';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UpcomingEventsComponent,
    SpeakerComponent,
    OrganizersComponent,
    PartnersComponent,
    EventComponent,
    EventDateComponent,
    MenuTopComponent,
    MenuLinkComponent,
    SponsorCategoryComponent,
    SlugPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApidaysRoutingModule
//    MaterialModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
