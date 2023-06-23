import { Component, EventEmitter, Output } from '@angular/core';
import { EntityTypes, TAB_NAMES_LIST } from '../interfaces/constants';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() changeTabEmit = new EventEmitter<EntityTypes>();

  public tabNamesList = TAB_NAMES_LIST;

  changeTab(tab: EntityTypes) {
    this.changeTabEmit.emit(tab);
  }
}
