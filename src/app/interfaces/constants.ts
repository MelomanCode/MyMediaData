export type EntityTypes =
  | 'series'
  | 'films'
  | 'anime'
  | 'manga'
  | 'audiobooks'
  | 'home';

export const TAB_NAMES_LIST: EntityTypes[] = [
  'films',
  'series',
  'anime',
  'manga',
  'audiobooks',
];

// export const interstellar: IFilm = {
//   id: '',
//   name: 'Интерстеллар',
//   imageLink:
//     'https://upload.wikimedia.org/wikipedia/ru/c/c3/Interstellar_2014.jpg',
//   IMDb: 8.6,
//   myTop: 10,
//   filmGenre: 'Fantasy',
//   link: 'https://rezka.ag/films/fiction/2259-interstellar-2014.html',
//   comments: '',
//   description: '',
// };

// export const AliceInBorderland: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: 'https://citaty.info/files/posters/%D0%90%D0%BB%D0%B8%D1%81%D0%B0%20%D0%B2%20%D0%9F%D0%BE%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D1%8C%D0%B5%20%28Alice%20in%20Borderland%29.jpg'
// }
//
// export const AmericanGods: ISeries = {
//   name: 'Американские боги',
//   seasons: 3,
//   episodesInSeason: 8,
//   IMDb:  7.6,
//   myTop: 6.9,
//   imageLink: 'https://fanfics.me/images/fandoms_heroes/714-1491929850.jpg',
//   link: 'https://rezka.ag/series/fantasy/16255-van-helsing-2016.html#t:111-s:5-e:1'
// }
//
// export const archive81: ISeries = {
//   id: '',
//   name: 'Архив 81',
//   seasons: 1,
//   episodesInSeason: 8,
//   IMDb: 7.3,
//   myTop: 9.6,
//   imageLink: 'https://upload.wikimedia.org/wikipedia/ru/9/9d/Archive_81.jpg',
//   description: '',
//   link: '',
//   comments: '',
// };
//
// export const AvatarOfKing: ISeries = {
//   name: 'Аварар короля',
//   seasons: 1,
//   episodesInSeason: 40,
//   IMDb:  8.1,
//   myTop: 9,
//   imageLink: 'https://doramafox.ru/wp-content/uploads/2019/06/avatar-korolya.jpg'
// }
//
// export const AmericanNightStory: ISeries = {
//   name: 'Американские истории ужасов',
//   seasons: 2,
//   episodesInSeason: '7 - 8',
//   IMDb:  6.2,
//   myTop: 6.5,
//   imageLink: 'https://www.film.ru/sites/default/files/images/2490962.jpg'
// }
//
// export const AlchemySoul: ISeries = {
//   name: 'Алхимия душ',
//   seasons: 2,
//   episodesInSeason: '10 - 20',
//   IMDb:  8.8,
//   myTop: 7.2,
//   imageLink: 'https://doramy.club/wp-content/uploads/2022/06/alximiya-dush.jpg'
// }
//
// export const FearWalkingDead: ISeries = {
//   name: 'Бойтесь ходячих мертвецов',
//   seasons: 7,
//   episodesInSeason: '8 - 16',
//   IMDb:  6.8,
//   myTop: 8,
//   imageLink: 'https://lamafilm.club/wp-content/uploads/2018/05/bojtes-xodyachix-mertvecov.jpg'
// }
//
// export const BymHome: ISeries = {
//   name: 'Бумажный дом',
//   seasons: 5,
//   episodesInSeason: '8 - 13',
//   IMDb:  8.2,
//   myTop: 9.8,
//   imageLink: 'https://media.kg-portal.ru/tv/m/moneyheist/posters/moneyheist_1.jpg'
// }
//
// export const BolTvar: ISeries = {
//   name: 'Болотная тварь',
//   seasons: 1,
//   episodesInSeason: 10,
//   IMDb:  7.4,
//   myTop: 8,
//   imageLink: 'https://media.kg-portal.ru/tv/s/swampthing/posters/swampthing_15.jpg'
// }
//
// export const Boltun: ISeries = {
//   name: 'Болтун',
//   seasons: 1,
//   episodesInSeason: 16,
//   IMDb:  7.9,
//   myTop: 8.5,
//   imageLink: 'https://doramy.club/wp-content/uploads/2022/07/boltun.jpg'
// }
//
// export const VanHelsing: ISeries = {
//   name: 'Ванхельсинг',
//   seasons: 5,
//   episodesInSeason: 13,
//   IMDb:  6.2,
//   myTop: 7.7,
//   imageLink: 'https://m.media-amazon.com/images/M/MV5BZDlhNTRmYjItYTYwNi00ODgwLTkwODUtZjIwOTgxMWY3ZmViXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'
// }
//
// export const Withers: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const Wizards: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const InTheDeathSand: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const RaisedByWolves: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const RaisedByWolves: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const RaisedByWolves: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const RaisedByWolves: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const RaisedByWolves: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const RaisedByWolves: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const RaisedByWolves: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const RaisedByWolves: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const RaisedByWolves: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
//
// export const RaisedByWolves: ISeries = {
//   name: 'Алиса в пограничье',
//   seasons: 2,
//   episodesInSeason: 8,
//   IMDb:  7.7,
//   myTop: 8.5,
//   imageLink: ''
// }
