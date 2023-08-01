import { EntityTypes } from '../interfaces/constants';
import {
  Entity,
  IAnime,
  IAudiobook,
  IEntity,
  IFilm,
  IManga,
  ISeries,
} from '../interfaces/my-media-data.interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Directive, ViewChild } from '@angular/core';
import { FilmsService } from '../services/films.service';
import { SeriesService } from '../services/series.service';
import { AnimeService } from '../services/anime.service';
import { MangaService } from '../services/manga.service';
import { AudiobooksService } from '../services/audiobooks.service';
import { setLocalStorage } from '../general.functions';

@Directive()
export class ContentBaseClass {
  @ViewChild('content') content: any;

  tab: EntityTypes = 'home';
  filmArray: IFilm[] = [];
  seriesArray: ISeries[] = [];
  animeArray: IAnime[] = [];
  mangaArray: IManga[] = [];
  audiobookArray: IAudiobook[] = [];
  showArray: IEntity[] = [];
  constructor(
    public modalService: NgbModal,
    public filmsService: FilmsService,
    public seriesService: SeriesService,
    public animeService: AnimeService,
    public mangaService: MangaService,
    public audiobooksService: AudiobooksService
  ) {}

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

  protected getSerials(): void {
    console.log('serials Server');
    this.seriesService.getValues().then((seriesList) => {
      this.seriesArray = Array.from(seriesList);
      this.updateCountEntity('serialsCount', this.seriesArray.length);
      this.showArray = this.seriesArray.map((el) => new Entity(el as IEntity));
      setLocalStorage('series', this.seriesArray as IEntity[]);
    });
  }

  protected getFilms(): void {
    console.log('films Server');
    this.filmsService.getValues().then((filmsList) => {
      this.filmArray = Array.from(filmsList);
      this.updateCountEntity('filmsCount', this.filmArray.length);
      this.showArray = this.filmArray.map((el) => new Entity(el as IEntity));
      setLocalStorage('films', this.filmArray as IEntity[]);
    });
  }

  protected getAnime(): void {
    console.log('anime Server');
    this.animeService.getValues().then((animeList) => {
      this.animeArray = Array.from(animeList);
      this.updateCountEntity('animeCount', this.animeArray.length);
      this.showArray = this.animeArray.map((el) => new Entity(el as IEntity));
      setLocalStorage('anime', this.animeArray as IEntity[]);
    });
  }

  protected getManga(): void {
    console.log('manga Server');
    this.mangaService.getValues().then((mangaList) => {
      this.mangaArray = Array.from(mangaList);
      this.updateCountEntity('mangaCount', this.mangaArray.length);
      this.showArray = this.mangaArray.map((el) => new Entity(el as IEntity));
      setLocalStorage('manga', this.mangaArray as IEntity[]);
    });
  }

  protected getAudiobooks(): void {
    console.log('audiobook Server');
    this.audiobooksService.getValues().then((audiobooksList) => {
      this.audiobookArray = Array.from(audiobooksList);
      this.updateCountEntity('audiobooksCount', this.audiobookArray.length);
      this.showArray = this.audiobookArray.map(
        (el) => new Entity(el as IEntity)
      );
      setLocalStorage('audiobooks', this.audiobookArray as IEntity[]);
    });
  }

  protected updateCountEntity(
    entityName:
      | 'filmsCount'
      | 'serialsCount'
      | 'animeCount'
      | 'mangaCount'
      | 'audiobooksCount',
    count: number
  ) {}
}
