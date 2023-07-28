import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { IFilm } from '../interfaces/my-media-data.interfaces';
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

  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }
}
