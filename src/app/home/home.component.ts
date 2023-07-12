import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityTypes, TAB_NAMES_LIST } from 'src/app/interfaces/constants';
import {
  Entity,
  IAnime,
  IAudiobook,
  IEntity,
  IFilm,
  IManga,
  ISeries,
} from 'src/app/interfaces/my-media-data.interfaces';
import { FilmsService } from 'src/app/services/films.service';
import { SeriesService } from 'src/app/services/series.service';
import { AnimeService } from 'src/app/services/anime.service';
import { AudiobooksService } from 'src/app/services/audiobooks.service';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('content') content: any;

  public tabNamesList = TAB_NAMES_LIST;
  tab: EntityTypes = 'home';
  filmArray: IFilm[] = [];
  seriesArray: ISeries[] = [];
  animeArray: IAnime[] = [];
  mangaArray: IManga[] = [];
  audiobookArray: IAudiobook[] = [];
  showArray: IEntity[] = [];
  editableEntity: Entity = new Entity();
  searchValue = '';
  scrollDirection: 'up' | 'down' = 'up';
  nameSortTrigger: 'a-z' | 'z-a' | 'null' = 'null';
  myTopSortTrigger: 'a-z' | 'z-a' | 'null' = 'null';

  constructor(
    private modalService: NgbModal,
    private filmsService: FilmsService,
    private seriesService: SeriesService,
    private animeService: AnimeService,
    private mangaService: MangaService,
    private audiobooksService: AudiobooksService
  ) {}

  ngOnInit(): void {
    // const promise1 = this.filmsService.getValues().then((filmsList) => {
    //   this.filmArray = Array.from(filmsList);
    // });
    //
    // const promise2 = this.seriesService.getValues().then((seriesList) => {
    //   this.seriesArray = Array.from(seriesList);
    // });
    //
    // const promise3 = this.animeService.getValues().then((animeList) => {
    //   this.animeArray = Array.from(animeList);
    // });
    //
    // const promise4 = this.mangaService.getValues().then((mangaList) => {
    //   this.mangaArray = Array.from(mangaList);
    // });

    const promise5 = this.audiobooksService
      .getValues()
      .then((audiobooksList) => {
        this.audiobookArray = Array.from(audiobooksList);
      });

    // Promise.all([promise1, promise2, promise3, promise4, promise5]).then(() => {
    //   this.showArray = this.filmArray.map((el) => new Entity(el as IEntity));
    // });

    // TODO: delete after uncomment
    Promise.all([promise5]).then(() => {
      this.showArray = this.filmArray.map((el) => new Entity(el as IEntity));
    });
  }

  openXl() {
    this.modalService.open(this.content, { size: 'xl' });
  }

  about(entity: IEntity) {
    this.editableEntity = entity;
    this.openXl();
  }

  public changeTab(tab: EntityTypes): void {
    this.tab = tab;
    switch (this.tab) {
      case 'films':
        this.showArray = this.filmArray.map((el) => new Entity(el as IEntity));
        break;

      case 'series':
        this.showArray = this.seriesArray.map(
          (el) => new Entity(el as IEntity)
        );
        break;

      case 'anime':
        this.showArray = this.animeArray.map((el) => new Entity(el as IEntity));
        break;

      case 'manga':
        this.showArray = this.mangaArray.map((el) => new Entity(el as IEntity));
        break;

      case 'audiobooks':
        this.showArray = this.audiobookArray.map(
          (el) => new Entity(el as IEntity)
        );
        break;
    }
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
    console.log('sadsa');
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
}
