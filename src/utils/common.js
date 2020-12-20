// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandom = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return (lower + Math.random() * (upper - lower)).toFixed(1);
};

const getActivitiesClass = (isWatchList, isHistory, isFavorite) => {

  return {
    watchListActive: isWatchList ? `film-card__controls-item--active` : ``,
    historyActive: isHistory ? `film-card__controls-item--active` : ``,
    favoriteActive: isFavorite ? `film-card__controls-item--active` : ``
  };
};

const getActivitiesChecked = (isWatchList, isHistory, isFavorite) => {

  return {
    watchListActive: isWatchList ? `checked` : ``,
    historyActive: isHistory ? `checked` : ``,
    favoriteActive: isFavorite ? `checked` : ``
  };
};


const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

const sortByDate = (filmA, filmB) => {
  const dateA = dayjs(filmA.releaseDate);
  const dateB = dayjs(filmB.releaseDate);

  return dateB.diff(dateA, `day`);
};


const sortByRating = (filmA, filmB) => {
  return Number(filmB.totalRating) - Number(filmA.totalRating);
};

export {getRandomInteger, getRandom, getActivitiesClass, getActivitiesChecked, updateItem, sortByDate, sortByRating};
