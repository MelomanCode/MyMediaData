import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTypes, TAB_NAMES_LIST } from '../interfaces/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() scrollDirection = 'up';
  @Output() changeTabEmit = new EventEmitter<EntityTypes>();
  @Output() searchEmmit = new EventEmitter<string>();

  searchValue = '';
  isMenuOpen = false;

  public tabNamesList = TAB_NAMES_LIST;

  constructor(private router: Router) {}

  changeTab(tab: EntityTypes) {
    this.changeTabEmit.emit(tab);
  }

  updateSearchValue() {
    this.searchEmmit.emit(this.searchValue);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logIn() {
    this.router.navigate(['/authentication']).then();
  }
}
