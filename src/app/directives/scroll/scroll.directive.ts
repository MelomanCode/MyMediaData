import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appScrollDirection]',
})
export class ScrollDirective {
  @Output() scrollDirection = new EventEmitter<string>();

  private previousTimestamp = 0;
  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const currentTimestamp = event.target.scrollingElement.scrollTop;

    if (currentTimestamp && currentTimestamp > this.previousTimestamp) {
      this.scrollDirection.emit('down');
    } else {
      this.scrollDirection.emit('up');
    }
    this.previousTimestamp = currentTimestamp;
  }
}
