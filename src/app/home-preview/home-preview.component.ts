import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { IAnime, IFilm, ISeries } from '../interfaces/my-media-data.interfaces';
import { ContentBaseClass } from '../classes/content-base.class';

@Component({
  selector: 'app-home-preview',
  templateUrl: './home-preview.component.html',
  styleUrls: ['./home-preview.component.css'],
})
export class HomePreviewComponent extends ContentBaseClass implements OnInit {
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  topRatedFilms: IFilm[] = [];
  topRatedSerials: ISeries[] = [];
  topRatedAnime: IAnime[] = [];
  public config = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    mousewheel: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    thumbs: true,
    speed: 2000,
  };

  ngOnInit() {
    this.getFilms();
    this.getSerials();
    this.getAnime();
  }

  protected override getTopRatedFilms(): void {
    const filteredFilms = this.filmArray.filter(
      (films) => films.myTop >= 9 && films.myTop <= 10
    );
    this.topRatedFilms = this.getRandomFilms(filteredFilms, 6);
  }
  getRandomFilms(films: IFilm[], count: number): IFilm[] {
    count = Math.min(count, films.length);

    const copyFilms = [...films];

    const randomFilms: IFilm[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * copyFilms.length);
      randomFilms.push(copyFilms.splice(randomIndex, 1)[0]);
    }

    return randomFilms;
  }

  protected override getTopRatedSerials(): void {
    const filteredSerials = this.seriesArray.filter(
      (serials) => serials.myTop >= 9 && serials.myTop <= 10
    );
    this.topRatedSerials = this.getRandomSerials(filteredSerials, 6);
  }
  getRandomSerials(Serials: ISeries[], count: number): ISeries[] {
    count = Math.min(count, Serials.length);

    const copySerials = [...Serials];

    const randomSerials: ISeries[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * copySerials.length);
      randomSerials.push(copySerials.splice(randomIndex, 1)[0]);
    }

    return randomSerials;
  }

  protected override getTopRatedAnime(): void {
    const filteredAnime = this.animeArray.filter(
      (anime) => anime.myTop >= 9 && anime.myTop <= 10
    );
    this.topRatedAnime = this.getRandomAnime(filteredAnime, 6);
  }
  getRandomAnime(anime: IAnime[], count: number): IAnime[] {
    count = Math.min(count, anime.length);

    const copyAnime = [...anime];

    const randomAnime: IAnime[] = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * copyAnime.length);
      randomAnime.push(copyAnime.splice(randomIndex, 1)[0]);
    }

    return randomAnime;
  }

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }
  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }
}
