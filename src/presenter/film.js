import {render, RenderPosition, remove, replace} from "../utils/render.js";
import FilmCardView from "../view/film-card.js";
import FilmCommentsView from "../view/film-comments.js";
import NewCommentView from "../view/new-film-comment.js";
import {EMOJIS, ESC_KEY, Mode} from "../const.js";
import FilmDetailsView from "../view/film-details.js";
import {generateComments} from "../mock/comments.js";

export default class Film {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._mode = Mode.CLOSED;

    this._clickableCardElements = [`film-card__comments`, `film-card__poster`, `film-card__title`];

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoritesClick = this._handleFavoritesClick.bind(this);

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmEditComponent = new NewCommentView(EMOJIS, film);

    this._filmCardComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoritesClick);
    this._filmCardComponent.setClickHandler(this._handleOpenPopupClick);

    if (prevFilmComponent) {
      replace(this._filmCardComponent, prevFilmComponent);
      remove(prevFilmComponent);
    } else {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._closeFilmPopup();
    }
  }


  _openFilmPopup() {
    this._filmPopupComponent = new FilmDetailsView(this._film, this._getGenreTitle);
    this._mode = Mode.OPEN;
    document.body.classList.add(`hide-overflow`);

    const filmDetailsBottomContainer = this._filmPopupComponent.getElement().querySelector(`.film-details__bottom-container`);
    render(filmDetailsBottomContainer, new FilmCommentsView(this._getComments(this._film.comments)), RenderPosition.BEFOREEND);

    const filmDetails = filmDetailsBottomContainer.querySelector(`.film-details__comments-wrap`);
    render(filmDetails, this._filmEditComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._escKeyDownHandler);

    this._filmPopupComponent.setClickHandler(this._handleClosePopupClick);
    render(document.body, this._filmPopupComponent, RenderPosition.BEFOREEND);

    this._filmPopupComponent.setWatchListClickHandler(this._handleWatchListClick);

    this._filmPopupComponent.setHistoryClickHandler(this._handleHistoryClick);

    this._filmPopupComponent.setFavoriteClickHandler(this._handleFavoritesClick);
  }

  _closeFilmPopup() {
    document.body.classList.remove(`hide-overflow`);
    remove(this._filmPopupComponent);

    this._mode = Mode.CLOSED;
  }

  _handleOpenPopupClick(evt) {
    if (this._clickableCardElements.includes(evt.target.className)) {
      this._changeMode();
      this._openFilmPopup();
    }
  }

  _handleClosePopupClick() {
    this._closeFilmPopup();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === ESC_KEY) {
      this._changeMode();

      this._mode = Mode.CLOSED;
    }
  }

  _handleWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchList: !this._film.isWatchList
            }
        )
    );
  }

  _handleHistoryClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isHistory: !this._film.isHistory
            }
        )
    );
  }

  _handleFavoritesClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmCardComponent);
  }

  _getGenreTitle(genre) {
    return genre.length > 1 ? `Genres` : `Genre`;
  }

  _getComments(comments) {
    const commentList = generateComments();
    return new Array(comments.length).fill().map((currentElement, index) => commentList[index]);
  }
}
