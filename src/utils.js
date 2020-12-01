// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

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

const genreTitle = (genre) => {
  return genre.length > 1 ? `Genres` : `Genre`;
};

const getActivitiesClass = (isWatchList, isHistory, isFavorite) => {
  return {
    watchListActive: isWatchList ? `film-card__controls-item--active` : ``,
    historyActive: isHistory ? `film-card__controls-item--active` : ``,
    favoriteActive: isFavorite ? `film-card__controls-item--active` : ``
  };
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.APPEND_CHILD:
      container.appendChild(element);
      break;

  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {RenderPosition, render, getRandomInteger, getRandom, genreTitle, getActivitiesClass};
