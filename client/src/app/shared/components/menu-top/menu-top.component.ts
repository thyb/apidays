import { ElementRef, Renderer, Component, OnInit, AfterViewInit,Input } from '@angular/core';
import { Router } from '@angular/router'

import { ApidaysEvent, MenuLink } from '../../models'

declare var $:any;

@Component({
	selector: 'menu-top',
	template: `
	<div *ngIf="links.length" class="menu-top" [class.fixed]="fixed" [class.center]="center">
		<a *ngFor="let link of links" (click)="handleClick(link)" [class.active]="link.active">
			<i *ngIf="link.icon" class="fa fa-{{link.icon}}"></i> {{link.text}}
		</a>
	</div>
	<div style="height: 40px"></div>
	`,
	styleUrls: ['./menu-top.component.scss'],
	providers: []
})

export class MenuTopComponent implements OnInit, AfterViewInit {
	@Input() center:boolean = false
	@Input() fixed:boolean = false
	@Input() links:Array<MenuLink>

	stopListen:any;

	constructor(private renderer: Renderer, private router: Router) {
	}

	ngOnInit() {
		//console.log(this.links, this.fixed)
		this.links.forEach(link => {
			if (link.scroll && this.router.url.split('#')[1] == link.scroll) {
				setTimeout(() => { this.scrollTo(link) }, 1000)
			}
		})
	}

	ngAfterViewInit() {
        this.stopListen = this.renderer.listenGlobal('document', 'scroll', (event) => {
			let active = {
				menuLink: null,
				top: -Infinity
			}
			let last = {
				menuLink: null,
				top: -Infinity
			}

			if ( ! this.links ) { return false }
			let scroll = $('body').scrollTop()
			this.links.forEach(elem => {
				if ( ! elem.scroll) {
					return false;
				}

				let targetElem = $('#' + elem.scroll)
				if ( ! targetElem || ! targetElem.offset() ) {
					return false
				}

				let targetTop = targetElem.offset().top

				if (targetTop > last.top) {
					last = {
						menuLink: elem,
						top: targetTop
					}
				}

				if (scroll >= (targetTop - 50) && active.top <= (targetTop - 50)) {
					active = {
						top: targetTop - 50,
						menuLink: elem
					}
				}
			})
			if (scroll + $(window).height() >= $(document).height() - 5) {
				this.links.forEach(elem => {
					if (elem.scroll == last.menuLink.scroll) {
						elem.active = true
					}
					else {
						elem.active = false
					}
				})
			}
			else if (active.top != -Infinity && ! active.menuLink.active) {
				//console.log('active')
				this.links.forEach(elem => {
					if (elem.scroll == active.menuLink.scroll) {
						elem.active = true
					}
					else {
						elem.active = false
					}
				})
			}
		});
	}

    handleClick(link):any {
        //console.log(link.scroll, !!link)
        if (link.scroll) {
            this.scrollTo(link)
        }
        else if (link.link) {
            this.router.navigate([link.link])
        }
        return false;
    }

    scrollTo(link):any {
        let elm = $('#' + link.scroll);
        if ( ! elm) return false
        let offset = elm.offset()
        if (offset) {
            $('body').animate({scrollTop: offset.top - 39}, 300)
            this.router.navigate([this.router.url.split('#')[0]], {
                fragment: link.scroll
            })
        }
    }

	ngOnDestroy() {
		// Removs "listenGlobal" listener
		this.stopListen();
	}
}
