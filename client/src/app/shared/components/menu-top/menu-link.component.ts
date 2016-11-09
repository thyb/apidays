import { Component, AfterViewInit, OnInit, Input, Renderer, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { ApidaysEvent } from '../../models'

declare var $: any;

@Component({
	selector: 'menu-link',
	template: `
        <a (click)="handleClick()" [class.active]="active"><i *ngIf="icon" class="fa fa-{{icon}}"></i> <ng-content></ng-content></a>
	`,
	styles: [
        'a { background-color: red; position: relative; top: 2px; padding: 12px 18px 5px; display: inline-block; color: #333 }',
        'a:hover { border-bottom: 2px solid #AAA; }',
        'a.active { border-bottom: 2px solid #666 }',
        'a.active:hover { border-bottom: 2px solid #666 }',
        'i { margin-right: 5px }'
    ],
	providers: []
})

export class MenuLinkComponent implements OnInit, AfterViewInit {
	@Input() scroll: string;
    @Input() link: string;
    @Input() active: boolean;
    @Input() icon: string;

    activeRoute: string;

	constructor(private router: Router) {
    }

	ngOnInit() {
	}

    ngAfterViewInit() {
        //console.log(this.router.url.split('#')[1] == this.scroll);
        if (this.router.url.split('#')[1] == this.scroll) {
            setTimeout(() => { this.scrollTo() }, 1000)
        }
    }

    handleClick():any {
        //console.log(this.scroll, !!this.scroll, this.link)
        if (this.scroll) {
            this.scrollTo()
        }
        else if (this.link) {
            this.router.navigate([this.link])
        }
        return false;
    }

    scrollTo():any {
        let elm = $('#' + this.scroll);
        if ( ! elm) return false
        let offset = elm.offset()
        if (offset) {
            $('body').animate({scrollTop: offset.top - 40}, 300)
            this.router.navigate([this.router.url.split('#')[0]], {
                fragment: this.scroll
            })
        }
    }
}
