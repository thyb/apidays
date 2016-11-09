import { ElementRef, Component, OnInit, Input } from '@angular/core';

import { ApidaysSpeaker } from '../../models'

@Component({
  selector: 'speakers',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {
  @Input() speakers: Array<ApidaysSpeaker>;

  constructor(private elementRef: ElementRef) { 
    //this.elementRef.nativeElement.className = 'ui card centered '
  }

  ngOnInit() {
  }

}
