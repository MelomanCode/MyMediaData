import { IEntity } from './interfaces/my-media-data.interfaces';
import { EntityTypes } from './interfaces/constants';

export const getRandomEntities = (
  values: IEntity[],
  count: number
): IEntity[] => {
  count = Math.min(count, values.length);
  const copyValues = [...values];
  const randomValues: IEntity[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * copyValues.length);
    randomValues.push(copyValues.splice(randomIndex, 1)[0]);
  }
  return randomValues;
};

export const getLocalStorage = (key: EntityTypes): IEntity[] => {
  const tmp = localStorage.getItem(key);
  if (tmp) {
    return JSON.parse(tmp) as IEntity[];
  } else {
    return [];
  }
};

export const setLocalStorage = (key: EntityTypes, values: IEntity[]) => {
  localStorage.setItem(key, JSON.stringify(values));
};
