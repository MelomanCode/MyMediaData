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

  constructor(
    private modalService: NgbModal,
    private filmsService: FilmsService,
    private seriesService: SeriesService,
    private animeService: AnimeService,
    private mangaService: MangaService,
    private audiobooksService: AudiobooksService
  ) {}

  ngOnInit(): void {
    const promise1 = this.filmsService.getValues().then((filmsList) => {
      this.filmArray = Array.from(filmsList);
    });

    const promise2 = this.seriesService.getValues().then((seriesList) => {
      this.seriesArray = Array.from(seriesList);
    });

    const promise3 = this.animeService.getValues().then((animeList) => {
      this.animeArray = Array.from(animeList);
    });

    const promise4 = this.mangaService.getValues().then((mangaList) => {
      this.mangaArray = Array.from(mangaList);
    });

    const promise5 = this.audiobooksService
      .getValues()
      .then((audiobooksList) => {
        this.audiobookArray = Array.from(audiobooksList);
      });

    Promise.all([promise1, promise2, promise3, promise4, promise5]).then(() => {
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

  truncateString(originalString: string): string {
    return originalString.slice(0, 150) + '...';
  }

  onScrollDirection(direction: string) {
    this.scrollDirection = direction as 'up' | 'down';
  }
}
