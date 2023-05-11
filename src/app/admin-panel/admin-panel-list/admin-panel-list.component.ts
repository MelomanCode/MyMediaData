import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  archive81,
  EntityTypes,
  interstellar,
  TAB_NAMES_LIST,
} from '../../interfaces/constants';
import {
  IAnime,
  IAudiobook,
  IFilm,
  IManga,
  ISeries,
} from '../../interfaces/my-media-data.interfaces';

@Component({
  selector: 'app-admin-panel-list',
  templateUrl: './admin-panel-list.component.html',
  styleUrls: ['./admin-panel-list.component.css'],
})
export class AdminPanelListComponent implements OnInit {
  @ViewChild('content') content: any;
  @ViewChild('closeModal') closeModal: any;

  public tabNamesList = TAB_NAMES_LIST;
  tab: EntityTypes = 'films';
  filmArray: IFilm[] = [];
  seriesArray: ISeries[] = [];
  animeArray: IAnime[] = [];
  mangaArray: IManga[] = [];
  audiobookArray: IAudiobook[] = [];
  showArray: any[] = [];

  editableEntity: any = null;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      const tmp = Object.assign({}, interstellar);
      const tmp1: ISeries = Object.assign({}, archive81);
      tmp.id = i.toString();
      tmp1.id = i.toString();
      this.filmArray.push(tmp);
      this.seriesArray.push(tmp1);
    }
    this.showArray = this.filmArray;
    console.log(this.showArray);
  }

  add() {
    this.editableEntity = null;
    this.openXl();
  }

  edit(entity: any) {
    this.editableEntity = entity;
    this.openXl();
  }

  delete(entity: any) {
    this.showArray = this.showArray.filter((el) => el.id !== entity.id);
    switch (this.tab) {
      case 'films':
        this.filmArray = this.showArray;
        break;

      case 'series':
        this.seriesArray = this.showArray;
        break;

      case 'anime':
        this.animeArray = this.showArray;
        break;

      case 'manga':
        this.mangaArray = this.showArray;
        break;

      case 'audiobooks':
        this.audiobookArray = this.showArray;
        break;
    }
  }

  openXl() {
    this.modalService.open(this.content, { size: 'xl' });
  }

  public changeTab(tab: EntityTypes): void {
    this.tab = tab;
    switch (this.tab) {
      case 'films':
        this.showArray = this.filmArray;
        break;

      case 'series':
        this.showArray = this.seriesArray;
        break;

      case 'anime':
        this.showArray = this.animeArray;
        break;

      case 'manga':
        this.showArray = this.mangaArray;
        break;

      case 'audiobooks':
        this.showArray = this.audiobookArray;
        break;
    }
  }

  public updateData(data: any): void {
    if (this.editableEntity) {
      const index = this.showArray.findIndex((el) => el.id === data.id);
      if (index !== -1) {
        this.showArray[index] = data;
      }
    } else {
      this.showArray.push(data);
    }

    this.modalService.dismissAll();
  }
}
