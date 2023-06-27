export interface IHeroProf {
  name: string;
  universal: string;
  age: number;
  power: string | number;
  history: string;
  worldRank: number;
  imageLink: string;
  comments: string;
}

export interface IEntityBase {
  id: string;
  name: string;
  myTop: number;
  imageLink: string;
  comments: string;
  link: string;
  description: string;
  release: string;
  views: string;
}

export interface ISeries extends IEntityBase {
  seasons: string;
  episodesInSeason: string;
  IMDb: number;
}

export interface IFilm extends IEntityBase {
  filmGenre: string;
  IMDb: number;
}

export interface IAnime extends IEntityBase {
  seasons: string;
  episodesInSeason: string;
  category: string;
}

export interface IManga extends IEntityBase {
  chapters: number;
  remangaGrade: number;
  state: string;
}

export interface IAudiobook extends IEntityBase {
  books: number;
  chapters: number;
  state: string;
}

export interface IEntity extends IFilm, ISeries, IAnime, IManga, IAudiobook {}

export class Entity implements IEntity {
  IMDb = 0;
  books = 0;
  category = '';
  chapters = 0;
  comments = '';
  description = '';
  episodesInSeason = '';
  filmGenre = '';
  id = '';
  imageLink = '';
  link = '';
  myTop = 0;
  name = '';
  remangaGrade = 0;
  seasons = '';
  release = '';
  state = '';
  views = '';

  constructor(params?: IEntity) {
    if (params) {
      this.IMDb = params.IMDb || 0;
      this.books = params.books || 0;
      this.category = params.category || '';
      this.chapters = params.chapters || 0;
      this.comments = params.comments || '';
      this.description = params.description || '';
      this.episodesInSeason = params.episodesInSeason || '';
      this.filmGenre = params.filmGenre || '';
      this.id = params.id || '';
      this.imageLink = params.imageLink || '';
      this.link = params.link || '';
      this.myTop = params.myTop || 0;
      this.name = params.name || '';
      this.remangaGrade = params.remangaGrade || 0;
      this.seasons = params.seasons || '';
      this.release = params.release || '';
      this.state = params.state || '';
      this.views = params.views || '';
    }
  }
}
