import { Component, Input, ViewChild } from '@angular/core';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { IAnime, IFilm, ISeries } from '../interfaces/my-media-data.interfaces';

@Component({
  selector: 'app-home-preview',
  templateUrl: './home-preview.component.html',
  styleUrls: ['./home-preview.component.css'],
})
export class HomePreviewComponent {
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  @Input() topRatedFilms: IFilm[] = [];
  @Input() topRatedSerials: ISeries[] = [];
  @Input() topRatedAnime: IAnime[] = [];

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
}
