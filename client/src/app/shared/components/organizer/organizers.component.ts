import { Component, OnInit, Input } from '@angular/core';

import { ApidaysOrganizer } from '../../models'


@Component({
    selector: 'organizers',
    template: `
        <div class="organizers-container">
            <div class="organizer" *ngFor="let organizer of organizers">
                <div class="logo">
                    <a [href]="organizer.url" target="_blank">
                        <img [src]="organizer.logo" alt="logo"/>
                    </a>
                </div>
                <p>{{organizer.company}}</p>
            </div>
        </div>
	`,
    styleUrls: [ './organizers.component.scss' ],
    providers: []
})

export class OrganizersComponent implements OnInit {
    @Input() organizers: Array<ApidaysOrganizer>

    constructor() {

    }

    ngOnInit() {
    }
}
