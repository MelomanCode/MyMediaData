import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sandwich',
  templateUrl: './sandwich.component.html',
  styleUrls: ['./sandwich.component.css'],
})
export class SandwichComponent {
  @Output() toggleSidenavEvent = new EventEmitter<void>();

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }
}
