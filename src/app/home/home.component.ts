import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Entity,
  IAnime,
  ICount,
  IEntity,
  IFilm,
  ISeries,
} from 'src/app/interfaces/my-media-data.interfaces';
import { FilmsService } from 'src/app/services/films.service';
import { SeriesService } from 'src/app/services/series.service';
import { AnimeService } from 'src/app/services/anime.service';
import { AudiobooksService } from 'src/app/services/audiobooks.service';
import { MangaService } from 'src/app/services/manga.service';
import { ContentBaseClass } from '../classes/content-base.class';
import { CountEntityService } from '../services/count-entity.service';
import { EntityTypes } from '../interfaces/constants';
import {
  getLocalStorage,
  getRandomEntities,
  setLocalStorage,
} from '../general.functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends ContentBaseClass implements OnInit {
  editableEntity: Entity = new Entity();
  searchValue = '';
  scrollDirection: 'up' | 'down' = 'up';
  nameSortTrigger: 'a-z' | 'z-a' | 'null' = 'null';
  myTopSortTrigger: 'a-z' | 'z-a' | 'null' = 'null';
  countEntity: ICount = {
    id: '',
    filmsCount: 0,
    serialsCount: 0,
    animeCount: 0,
    mangaCount: 0,
    audiobooksCount: 0,
  };

  topRatedFilms: IFilm[] = [];
  topRatedSerials: ISeries[] = [];
  topRatedAnime: IAnime[] = [];

  constructor(
    modalService: NgbModal,
    filmsService: FilmsService,
    seriesService: SeriesService,
    animeService: AnimeService,
    mangaService: MangaService,
    audiobooksService: AudiobooksService,
    private countEntityService: CountEntityService
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
    this.getCountEntity();
  }

  about(entity: IEntity) {
    this.editableEntity = entity;
    this.openXl();
  }

  sort(type: 'a-z' | 'z-a' | 'null', field: 'name' | 'myTop') {
    if (type === 'null') {
      return;
    }

    this.showArray = this.showArray.sort((a, b) => {
      const nameA = field === 'name' ? a.name.toLowerCase() : a.myTop;
      const nameB = field === 'name' ? b.name.toLowerCase() : b.myTop;

      if (nameA < nameB) {
        let tmp;
        type === 'z-a' ? (tmp = 1) : (tmp = -1);
        return tmp;
      }
      if (nameA > nameB) {
        let tmp;
        type === 'a-z' ? (tmp = 1) : (tmp = -1);
        return tmp;
      }
      return 0;
    });
  }
  sortTrigger(field: 'name' | 'myTop') {
    if (field === 'name') {
      this.nameSortTrigger === 'a-z'
        ? this.sort('z-a', field)
        : this.sort('a-z', field);
      this.nameSortTrigger === 'a-z'
        ? (this.nameSortTrigger = 'z-a')
        : (this.nameSortTrigger = 'a-z');
    } else {
      this.myTopSortTrigger === 'a-z'
        ? this.sort('z-a', field)
        : this.sort('a-z', field);
      this.myTopSortTrigger === 'a-z'
        ? (this.myTopSortTrigger = 'z-a')
        : (this.myTopSortTrigger = 'a-z');
    }
  }

  onScrollDirection(direction: string) {
    this.scrollDirection = direction as 'up' | 'down';
  }

  getCountEntity() {
    this.countEntityService.getValues().then((value) => {
      if (value?.[0]) {
        this.countEntity = Object.assign({}, value[0]);
      } else {
        this.creatCountEntity();
      }
      this.getEntity('films');
      this.getEntity('series');
      this.getEntity('anime');
      this.getEntity('manga');
      this.getEntity('audiobooks');
    });
  }

  creatCountEntity() {
    this.countEntityService.createValue(this.countEntity).then((id) => {
      if (id) {
        this.countEntity.id = id;
      }
    });
  }

  override updateCountEntity(
    entityName:
      | 'filmsCount'
      | 'serialsCount'
      | 'animeCount'
      | 'mangaCount'
      | 'audiobooksCount',
    count: number
  ) {
    if (+this.countEntity[entityName] === +count) {
      return;
    }
    this.countEntity[entityName] = count;
    this.countEntityService.updateValue(this.countEntity).then();
  }

  getEntity(entityName: EntityTypes): void {
    switch (entityName) {
      case 'films': {
        const entityList = getLocalStorage(entityName);
        if (entityList?.length) {
          if (+this.countEntity.filmsCount === +entityList.length) {
            this.filmArray = Array.from(entityList);
            this.showArray = this.filmArray.map(
              (el) => new Entity(el as IEntity)
            );
          } else {
            this.getFilms();
          }
        } else {
          this.getFilms();
        }
        const filteredValues = this.filmArray.filter(
          (values) => values.myTop >= 9 && values.myTop <= 10
        );
        this.topRatedFilms = getRandomEntities(filteredValues as IEntity[], 6);
        break;
      }
      case 'series': {
        const entityList = getLocalStorage(entityName);
        if (entityList?.length) {
          if (+this.countEntity.serialsCount === +entityList.length) {
            this.seriesArray = Array.from(entityList);
            this.showArray = this.seriesArray.map(
              (el) => new Entity(el as IEntity)
            );
          } else {
            this.getSerials();
          }
        } else {
          this.getSerials();
        }
        const filteredValues = this.seriesArray.filter(
          (values) => values.myTop >= 9 && values.myTop <= 10
        );
        this.topRatedSerials = getRandomEntities(
          filteredValues as IEntity[],
          6
        );
        break;
      }
      case 'anime': {
        const entityList = getLocalStorage(entityName);
        if (entityList?.length) {
          if (+this.countEntity.animeCount === +entityList.length) {
            this.animeArray = Array.from(entityList);
            this.showArray = this.animeArray.map(
              (el) => new Entity(el as IEntity)
            );
          } else {
            this.getAnime();
          }
        } else {
          this.getAnime();
        }
        const filteredValues = this.animeArray.filter(
          (values) => values.myTop >= 9 && values.myTop <= 10
        );
        this.topRatedAnime = getRandomEntities(filteredValues as IEntity[], 6);
        break;
      }
      case 'manga': {
        const entityList = getLocalStorage(entityName);
        if (entityList?.length) {
          if (+this.countEntity.mangaCount === +entityList.length) {
            this.mangaArray = Array.from(entityList);
            this.showArray = this.mangaArray.map(
              (el) => new Entity(el as IEntity)
            );
          } else {
            this.getManga();
          }
        } else {
          this.getManga();
        }
        break;
      }
      case 'audiobooks': {
        const entityList = getLocalStorage(entityName);
        if (entityList?.length) {
          if (+this.countEntity.audiobooksCount === +entityList.length) {
            this.audiobookArray = Array.from(entityList);
            this.showArray = this.audiobookArray.map(
              (el) => new Entity(el as IEntity)
            );
          } else {
            this.getAudiobooks();
          }
        } else {
          this.getAudiobooks();
        }
        break;
      }
    }
  }
}
