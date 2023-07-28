import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TAB_NAMES_LIST } from '../../interfaces/constants';
import { Entity, IEntity } from '../../interfaces/my-media-data.interfaces';
import { FilmsService } from '../../services/films.service';
import { SeriesService } from '../../services/series.service';
import { AnimeService } from '../../services/anime.service';
import { AudiobooksService } from '../../services/audiobooks.service';
import { MangaService } from '../../services/manga.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ContentBaseClass } from '../../classes/content-base.class';

@Component({
  selector: 'app-admin-panel-list',
  templateUrl: './admin-panel-list.component.html',
  styleUrls: ['./admin-panel-list.component.css'],
})
export class AdminPanelListComponent
  extends ContentBaseClass
  implements OnInit
{
  public tabNamesList = TAB_NAMES_LIST;
  isMenuOpen = false;
  user: any;
  userIconState = false;

  editableEntity: Entity = new Entity();

  constructor(
    modalService: NgbModal,
    filmsService: FilmsService,
    seriesService: SeriesService,
    animeService: AnimeService,
    mangaService: MangaService,
    audiobooksService: AudiobooksService,
    public auth: AngularFireAuth
  ) {
    super(
      modalService,
      filmsService,
      seriesService,
      animeService,
      mangaService,
      audiobooksService
    );
  }

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.auth.signOut().then();
  }

  changeUserIconState() {
    this.userIconState = !this.userIconState;
  }

  add() {
    this.editableEntity = new Entity();
    this.openXl();
  }

  edit(entity: IEntity) {
    this.editableEntity = entity;
    this.openXl();
  }

  delete(entity: IEntity) {
    this.showArray = this.showArray.filter((el) => el.id !== entity.id);
    switch (this.tab) {
      case 'films':
        this.filmsService.deleteValue(entity).then(() => {
          this.filmArray = this.showArray;
        });
        break;

      case 'series':
        this.seriesService.deleteValue(entity).then(() => {
          this.seriesArray = this.showArray;
        });
        break;

      case 'anime':
        this.animeService.deleteValue(entity).then(() => {
          this.animeArray = this.showArray;
        });
        break;

      case 'manga':
        this.mangaService.deleteValue(entity).then(() => {
          this.mangaArray = this.showArray;
        });
        break;

      case 'audiobooks':
        this.audiobooksService.deleteValue(entity).then(() => {
          this.audiobookArray = this.showArray;
        });
        break;
    }
  }

  public updateData(data: IEntity): void {
    if (this.editableEntity.id !== '') {
      const index = this.showArray.findIndex((el) => el.id === data.id);
      if (index !== -1) {
        switch (this.tab) {
          case 'films':
            this.filmsService.updateValue(data).then();
            this.filmArray.push(data);
            this.filmArray[index] = data;
            this.showArray[index] = data;
            break;

          case 'series':
            this.seriesService.updateValue(data).then();
            this.seriesArray.push(data);
            this.seriesArray[index] = data;
            this.showArray[index] = data;
            break;

          case 'anime':
            this.animeService.updateValue(data).then();
            this.animeArray.push(data);
            this.animeArray[index] = data;
            this.showArray[index] = data;
            break;

          case 'manga':
            this.mangaService.updateValue(data).then();
            this.mangaArray.push(data);
            this.mangaArray[index] = data;
            this.showArray[index] = data;
            break;

          case 'audiobooks':
            this.audiobooksService.updateValue(data).then();
            this.audiobookArray.push(data);
            this.audiobookArray[index] = data;
            this.showArray[index] = data;
            break;
        }
      }
    } else {
      switch (this.tab) {
        case 'films':
          this.filmsService.createValue(data).then((newFilmId) => {
            data.id = newFilmId;
            this.filmArray.push(data);
            this.showArray.push(data);
          });
          break;

        case 'series':
          this.seriesService.createValue(data).then((newSeriesId) => {
            data.id = newSeriesId;
            this.seriesArray.push(data);
            this.showArray.push(data);
          });
          break;

        case 'anime':
          this.animeService.createValue(data).then((newAnimeId) => {
            data.id = newAnimeId;
            this.animeArray.push(data);
            this.showArray.push(data);
          });
          break;

        case 'manga':
          this.mangaService.createValue(data).then((newMangaId) => {
            data.id = newMangaId;
            this.mangaArray.push(data);
            this.showArray.push(data);
          });
          break;

        case 'audiobooks':
          this.audiobooksService.createValue(data).then((newAudiobookId) => {
            data.id = newAudiobookId;
            this.audiobookArray.push(data);
            this.showArray.push(data);
          });
          break;
      }
    }
    this.modalService.dismissAll();
  }

  truncateString(originalString: string): string {
    return originalString.slice(0, 120) + '...';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
