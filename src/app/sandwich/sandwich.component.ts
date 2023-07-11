import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sandwich',
  templateUrl: './sandwich.component.html',
  styleUrls: ['./sandwich.component.css'],
})
export class SandwichComponent {
  @Input() isOpenMenu = false;
  @Output() toggleSidenavEvent = new EventEmitter<void>();

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }
}
