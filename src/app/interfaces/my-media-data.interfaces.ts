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
}

export interface ISeries extends IEntityBase {
  seasons: number;
  episodesInSeason: number;
  IMDb: number;
}

export interface IFilm extends IEntityBase {
  filmGenre: string;
  IMDb: number;
}

export interface IAnime extends IEntityBase {
  seasons: number;
  episodesInSeason: number;
  category: string;
}

export interface IManga extends IEntityBase {
  chapters: number;
  remangaGrade: number;
}

export interface IAudiobook extends IEntityBase {
  books: number;
  chapters: number;
}

export interface IEntity extends IFilm, ISeries, IAnime, IManga, IAudiobook {}

export class Entity implements IEntity {
  IMDb = 0;
  books = 0;
  category = '';
  chapters = 0;
  comments = '';
  description = '';
  episodesInSeason = 0;
  filmGenre = '';
  id = '';
  imageLink = '';
  link = '';
  myTop = 0;
  name = '';
  remangaGrade = 0;
  seasons = 0;

  constructor(params?: IEntity) {
    if (params) {
      this.IMDb = params.IMDb;
      this.books = params.books;
      this.category = params.category;
      this.chapters = params.chapters;
      this.comments = params.comments;
      this.description = params.description;
      this.episodesInSeason = params.episodesInSeason;
      this.filmGenre = params.filmGenre;
      this.id = params.id;
      this.imageLink = params.imageLink;
      this.link = params.link;
      this.myTop = params.myTop;
      this.name = params.name;
      this.remangaGrade = params.remangaGrade;
      this.seasons = params.seasons;
    }
  }
}
