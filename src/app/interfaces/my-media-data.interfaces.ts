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
