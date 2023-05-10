import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
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
  selector: 'admin-panel-list',
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
  objFilm: IFilm = {
    id: '',
    name: '',
    filmGenre: '',
    IMDb: 0,
    myTop: 0,
    imageLink: '',
    comments: '',
    link: '',
  };

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    const tmp = Object.assign({}, interstellar);
    tmp.id = '1';
    this.filmArray.push(tmp);

    const tmp2 = Object.assign({}, interstellar);
    tmp2.id = '2';
    this.filmArray.push(tmp2);

    const tmp3 = Object.assign({}, interstellar);
    tmp3.id = '3';
    this.filmArray.push(tmp3);

    const tmp4 = Object.assign({}, interstellar);
    tmp4.id = '4';
    this.filmArray.push(tmp4);

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

  delete() {}

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
    if (this.tab === 'films') {
      const film = data as IFilm;
      if (this.editableEntity) {
        const index = this.filmArray.findIndex((el) => el.id === data.id);
        if (index !== -1) {
          this.filmArray[index] = data;
        }
      } else {
        this.filmArray.push(data);
      }

      console.log(film);
    }
    this.modalService.dismissAll();
  }
}
