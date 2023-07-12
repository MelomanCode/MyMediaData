import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityTypes, TAB_NAMES_LIST } from '../../interfaces/constants';
import {
  Entity,
  IAnime,
  IAudiobook,
  IEntity,
  IFilm,
  IManga,
  ISeries,
} from '../../interfaces/my-media-data.interfaces';
import { FilmsService } from '../../services/films.service';
import { SeriesService } from '../../services/series.service';
import { AnimeService } from '../../services/anime.service';
import { AudiobooksService } from '../../services/audiobooks.service';
import { MangaService } from '../../services/manga.service';

@Component({
  selector: 'app-admin-panel-list',
  templateUrl: './admin-panel-list.component.html',
  styleUrls: ['./admin-panel-list.component.css'],
})
export class AdminPanelListComponent implements OnInit {
  @ViewChild('content') content: any;

  public tabNamesList = TAB_NAMES_LIST;
  tab: EntityTypes = 'films';
  filmArray: IFilm[] = [];
  seriesArray: ISeries[] = [];
  animeArray: IAnime[] = [];
  mangaArray: IManga[] = [];
  audiobookArray: IAudiobook[] = [];
  showArray: IEntity[] = [];
  isMenuOpen = false;

  editableEntity: Entity = new Entity();

  constructor(
    private modalService: NgbModal,
    private filmsService: FilmsService,
    private seriesService: SeriesService,
    private animeService: AnimeService,
    private mangaService: MangaService,
    private audiobooksService: AudiobooksService
  ) {}

  ngOnInit(): void {}

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

  openXl() {
    this.modalService.open(this.content, { size: 'xl' });
  }

  public changeTab(tab: EntityTypes): void {
    this.tab = tab;
    switch (this.tab) {
      case 'films':
        if (this.filmArray?.length) {
          this.showArray = this.filmArray.map(
            (el) => new Entity(el as IEntity)
          );
        } else {
          this.getFilms();
        }
        break;

      case 'series':
        if (this.seriesArray?.length) {
          this.showArray = this.seriesArray.map(
            (el) => new Entity(el as IEntity)
          );
        } else {
          this.getSerials();
        }
        break;

      case 'anime':
        if (this.animeArray?.length) {
          this.showArray = this.animeArray.map(
            (el) => new Entity(el as IEntity)
          );
        } else {
          this.getAnime();
        }
        break;

      case 'manga':
        if (this.mangaArray?.length) {
          this.showArray = this.mangaArray.map(
            (el) => new Entity(el as IEntity)
          );
        } else {
          this.getManga();
        }
        break;

      case 'audiobooks':
        if (this.audiobookArray?.length) {
          this.showArray = this.audiobookArray.map(
            (el) => new Entity(el as IEntity)
          );
        } else {
          this.getAudiobooks();
        }
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

  private getSerials(): void {
    this.seriesService.getValues().then((seriesList) => {
      this.seriesArray = Array.from(seriesList);
      this.showArray = this.seriesArray.map((el) => new Entity(el as IEntity));
    });
  }

  private getFilms(): void {
    this.filmsService.getValues().then((filmsList) => {
      this.filmArray = Array.from(filmsList);
      this.showArray = this.filmArray.map((el) => new Entity(el as IEntity));
    });
  }

  private getAnime(): void {
    this.animeService.getValues().then((animeList) => {
      this.animeArray = Array.from(animeList);
      this.showArray = this.animeArray.map((el) => new Entity(el as IEntity));
    });
  }

  private getManga(): void {
    this.mangaService.getValues().then((mangaList) => {
      this.mangaArray = Array.from(mangaList);
      this.showArray = this.mangaArray.map((el) => new Entity(el as IEntity));
    });
  }

  private getAudiobooks(): void {
    this.audiobooksService.getValues().then((audiobooksList) => {
      this.audiobookArray = Array.from(audiobooksList);
      this.showArray = this.audiobookArray.map(
        (el) => new Entity(el as IEntity)
      );
    });
  }
}
