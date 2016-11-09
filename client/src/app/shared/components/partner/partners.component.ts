import { ElementRef, Component, OnInit, Input } from '@angular/core';

import { ApidaysPartner } from '../../models'

@Component({
  selector: 'partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  @Input() partners: Array<ApidaysPartner>;

  constructor(private elementRef: ElementRef) { 
    //this.elementRef.nativeElement.className = 'ui card centered '
  }

  ngOnInit() {
  }

}
