import AbstractWithHandler from "./abstract-with-handler.js";
import dayjs from "dayjs";
import {getActivitiesClass} from "../utils/common";

const createFilmCardTemplate = (filmCard) => {
  const {name, poster, releaseDate, runtime, genre, totalRating, commentsCount, description, isWatchList, isHistory, isFavorite} = filmCard;
  const genreString = genre.join(` `);
  const releaseYear = dayjs(releaseDate).format(`YYYY`);

  const activitiesClass = getActivitiesClass(isWatchList, isHistory, isFavorite);
  const {watchListActive, historyActive, favoriteActive} = activitiesClass;


  return `<article class="film-card">
          <h3 class="film-card__title" tabindex="0">${name}</h3>
          <p class="film-card__rating">${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseYear}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genreString}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster" tabindex="0">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments" tabindex="0">${commentsCount} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListActive}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${historyActive}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteActive}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractWithHandler {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
  }

  getTemplate() {
    return createFilmCardTemplate(this._filmCard);
  }
}
