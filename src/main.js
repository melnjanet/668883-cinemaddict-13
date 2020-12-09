import {EMOJIS, MAX_FILMS_NUMBER, FILM_COUNT_PER_STEP, MAX_EXTRA_FILM_CARD_NUMBER} from "./const.js";
import {genreTitle, getRandomInteger} from "./utils/common.js";
import {RenderPosition, render, remove} from "./utils/render.js";
import {popupToggle} from "./utils/popup.js";

import {generateFilmCard} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateComment} from "./mock/comments.js";

import MainNavigationView from "./view/main-navigation.js";
import SortListView from "./view/sort-list.js";
import ProfileView from "./view/profile.js";
import StatisticView from "./view/statistic.js";
import FilmsView from "./view/films.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
import FilmCardView from "./view/film-card.js";
import ShowMoreView from "./view/show-more.js";
import TopRatedView from "./view/top-rated.js";
import MostCommentedView from "./view/most-commented.js";
import FilmDetailsView from "./view/film-details.js";
import FilmCommentsView from "./view/film-comments.js";
import NewCommentView from "./view/new-film-comment.js";
import FooterStatisticsView from "./view/footer-statistics.js";

const filmCards = new Array(MAX_FILMS_NUMBER).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);
const comments = new Array(5).fill().map(generateComment);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const filmsComponent = new FilmsView();
const filmsListComponent = new FilmsListView();
const FilmListContainerComponent = new FilmsListContainerView();

const clickableCardElements = [`film-card__comments`, `film-card__poster`, `film-card__title`];

const renderFilmCard = (FilmListElement, films) => {
  const filmCardComponent = new FilmCardView(films);
  const filmDetailsComponent = new FilmDetailsView(films, genreTitle);

  filmCardComponent.setClickHandler((evt) => {

    if (clickableCardElements.includes(evt.target.className)) {
      document.body.classList.add(`hide-overflow`);

      const siteHideOverflow = document.querySelector(`.hide-overflow`);
      popupToggle(siteHideOverflow, filmDetailsComponent, true);

      const filmDetailsBottomContainer = filmDetailsComponent.getElement().querySelector(`.film-details__bottom-container`);
      render(filmDetailsBottomContainer, new FilmCommentsView(comments[films.comments]), RenderPosition.BEFOREEND);

      const filmDetails = filmDetailsBottomContainer.querySelector(`.film-details__comments-wrap`);
      render(filmDetails, new NewCommentView(EMOJIS), RenderPosition.BEFOREEND);

      filmDetailsComponent.setClickHandler(() => {
        document.body.classList.remove(`hide-overflow`);
        popupToggle(siteHideOverflow, filmDetailsComponent, false);
      });
    }
  });

  render(FilmListElement, filmCardComponent, RenderPosition.BEFOREEND);
};

render(siteMainElement, new MainNavigationView(filters), RenderPosition.BEFOREEND);
render(siteMainElement, new SortListView(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);
render(siteMainElement, new StatisticView(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);
render(filmsComponent, filmsListComponent, RenderPosition.BEFOREEND);
render(filmsListComponent, FilmListContainerComponent, RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_PER_STEP); i++) {
  renderFilmCard(FilmListContainerComponent.getElement(), filmCards[i]);
}

if (filmCards.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCardsCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreView();
  render(filmsListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

  showMoreButtonComponent.setClickHandler(() => {
    filmCards
      .slice(renderedFilmCardsCount, renderedFilmCardsCount + FILM_COUNT_PER_STEP)
      .forEach((filmCard) => renderFilmCard(FilmListContainerComponent, filmCard));

    renderedFilmCardsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCardsCount >= filmCards.length) {
      remove(showMoreButtonComponent);
    }
  });
}

render(filmsComponent, new TopRatedView(), RenderPosition.BEFOREEND);
render(filmsComponent, new MostCommentedView(), RenderPosition.BEFOREEND);

const siteFilmsListExtraElements = filmsComponent.getElement(`.films-list`).querySelectorAll(`.films-list--extra`);

siteFilmsListExtraElements.forEach((item) => {
  let siteFilmSListContainer = item.querySelector(`.films-list__container`);

  for (let i = 0; i < MAX_EXTRA_FILM_CARD_NUMBER; i++) {
    renderFilmCard(siteFilmSListContainer, filmCards[getRandomInteger(0, filmCards.length - 1)]);
  }
});

render(siteFooterElement, new FooterStatisticsView(MAX_FILMS_NUMBER), RenderPosition.BEFOREEND);
