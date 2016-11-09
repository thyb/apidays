import { Component, OnInit, Input } from '@angular/core';

import { ApidaysSponsor } from '../../models'

interface nbSponsors {
    gold: number,
    silver: number,
    bronze: number
}

@Component({
    selector: 'sponsors',
    template: `
        <h2 *ngIf="nbSponsors[category]"><i [style.color]="colors[category]" class="fa fa-star"></i> <span>{{category | uppercase}}</span></h2>
        <div class="ui doubling four cards centered" [class.four]="category == 'gold'" [class.six]="category == 'silver'" [class.eight]="category == 'bronze'">
            <a class="ui card link" [class.hide]="sponsor.event_sponsor.category != category" [href]="sponsor.url" *ngFor="let sponsor of sponsors">
                <div class="image">
                    <img [src]="sponsor.logo" alt="logo">
                </div>
                <div class="content">
                    <div class="header">{{sponsor.company}}</div>
                </div>
            </a>
        </div>
	`,
    styleUrls: [ './sponsor-category.component.scss' ],
    providers: []
})

export class SponsorCategoryComponent implements OnInit {
    @Input() category: string;
    @Input() sponsors: Array<ApidaysSponsor>

    colors = {
        gold: '#FFD700',
        silver: '#C0C0C0',
        bronze: '#CD7F32'
    }

    nbSponsors: any;


    constructor() {
    }

    ngOnInit() {
        if (this.sponsors) {
            this.nbSponsors = {
                gold: 0,
                silver: 0,
                bronze: 0
            }
            this.sponsors.map(sponsor => {
                this.nbSponsors[sponsor.event_sponsor.category]++
            })
        }
    }
}
