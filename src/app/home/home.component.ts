import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Entity, IEntity } from 'src/app/interfaces/my-media-data.interfaces';
import { FilmsService } from 'src/app/services/films.service';
import { SeriesService } from 'src/app/services/series.service';
import { AnimeService } from 'src/app/services/anime.service';
import { AudiobooksService } from 'src/app/services/audiobooks.service';
import { MangaService } from 'src/app/services/manga.service';
import { ContentBaseClass } from '../classes/content-base.class';

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

  constructor(
    modalService: NgbModal,
    filmsService: FilmsService,
    seriesService: SeriesService,
    animeService: AnimeService,
    mangaService: MangaService,
    audiobooksService: AudiobooksService
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

  ngOnInit(): void {}

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
}
