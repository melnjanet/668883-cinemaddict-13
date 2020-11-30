import dayjs from "dayjs";
import {createElement, getActivitiesClass} from "../utils";

const createGenreListTemplate = (genre) => {
  return new Array(genre.length).fill().map((currElement, index) => {
    return `<span class="film-details__genre">${genre[index]}</span>`;
  }).join(` `);
};

const createFilmDetailsTemplate = (filmCard, genreTitle) => {
  const {name, originalName, poster, releaseDate, director, writers, actors, country, runtime, genre, age, totalRating, description, isWatchList, isHistory, isFavorite} = filmCard;
  const genreLabel = genreTitle(genre);
  const genreItems = createGenreListTemplate(genre);
  const activitiesClass = getActivitiesClass(isWatchList, isHistory, isFavorite);
  const {watchListActive, historyActive, favoriteActive} = activitiesClass;
  const releaseFormattedDate = dayjs(releaseDate).format(`D MMMM YYYY`);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${age}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${name}</h3>
                <p class="film-details__title-original">${originalName}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(`, `)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseFormattedDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genreLabel}</td>
                <td class="film-details__cell">
                    ${genreItems}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${watchListActive}">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched ${historyActive}">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${favoriteActive}">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
      </div>
    </form>
  </section>`;
};

export default class FilmDetails {
  constructor(filmCard, genre) {
    this._filmCard = filmCard;
    this._genre = genre;
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._filmCard, this._genre);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
