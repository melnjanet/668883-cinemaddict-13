import {EMOJIS, MAX_FILMS_NUMBER, FILM_COUNT_PER_STEP, MAX_EXTRA_FILM_CARD_NUMBER} from "./const.js";
import {RenderPosition, genreTitle, getRandomInteger, render} from "./utils.js";

import {generateFilmCard} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateComment} from "./mock/comments";

import MainNavigationView from "./view/main-navigation";
import SortListView from "./view/sort-list";
import ProfileView from "./view/profile";
import StatisticView from "./view/statistic";
import FilmsView from "./view/films";
import FilmsListView from "./view/films-list";
import FilmsListContainerView from "./view/films-list-container";
import FilmCardView from "./view/film-card";
import ShowMoreView from "./view/show-more";
import TopRatedView from "./view/top-rated";
import MostCommentedView from "./view/most-commented";
import FilmDetailsView from "./view/film-details";
import FilmCommentsView from "./view/film-comments";
import NewCommentView from "./view/new-film-comment";
import FooterStatisticsView from "./view/footer-statistics";

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

const popupCreateDelete = (container, element, action) => {
  if (action === `open`) {
    container.appendChild(element);
  } else {
    container.removeChild(element);
  }
};

const renderFilmCard = (FilmListElement, films) => {
  const filmCardComponent = new FilmCardView(films);
  const filmDetailsComponent = new FilmDetailsView(films, genreTitle);

  filmCardComponent.getElement().addEventListener(`click`, (evt) => {
    if (clickableCardElements.includes(evt.target.className)) {
      document.body.classList.add(`hide-overflow`);

      const siteHideOverflow = document.querySelector(`.hide-overflow`);
      popupCreateDelete(siteHideOverflow, filmDetailsComponent.getElement(), `open`);

      const filmDetailsBottomContainer = filmDetailsComponent.getElement().querySelector(`.film-details__bottom-container`);
      render(filmDetailsBottomContainer, new FilmCommentsView(comments[films.comments]).getElement(), RenderPosition.BEFOREEND);

      const filmDetails = filmDetailsBottomContainer.querySelector(`.film-details__comments-wrap`);
      render(filmDetails, new NewCommentView(EMOJIS).getElement(), RenderPosition.BEFOREEND);

      filmDetailsComponent.getElement().querySelector(`.film-details__close`).addEventListener(`click`, () => {
        document.body.classList.remove(`hide-overflow`);
        popupCreateDelete(siteHideOverflow, filmDetailsComponent.getElement(), `close`);
      });
    }
  });

  render(FilmListElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteMainElement, new MainNavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortListView().getElement(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new StatisticView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);
render(filmsComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);
render(filmsListComponent.getElement(), FilmListContainerComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_PER_STEP); i++) {
  renderFilmCard(FilmListContainerComponent.getElement(), filmCards[i]);
}

if (filmCards.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCardsCount = FILM_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreView();
  render(filmsListComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    filmCards
      .slice(renderedFilmCardsCount, renderedFilmCardsCount + FILM_COUNT_PER_STEP)
      .forEach((filmCard) => renderFilmCard(FilmListContainerComponent.getElement(), filmCard));

    renderedFilmCardsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCardsCount >= filmCards.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

render(filmsComponent.getElement(), new TopRatedView().getElement(), RenderPosition.BEFOREEND);
render(filmsComponent.getElement(), new MostCommentedView().getElement(), RenderPosition.BEFOREEND);

const siteFilmsListExtraElements = filmsComponent.getElement(`.films-list`).querySelectorAll(`.films-list--extra`);

siteFilmsListExtraElements.forEach((item) => {
  let siteFilmSListContainer = item.querySelector(`.films-list__container`);

  for (let i = 0; i < MAX_EXTRA_FILM_CARD_NUMBER; i++) {
    renderFilmCard(siteFilmSListContainer, filmCards[getRandomInteger(0, filmCards.length - 1)]);
  }
});

render(siteFooterElement, new FooterStatisticsView(MAX_FILMS_NUMBER).getElement(), RenderPosition.BEFOREEND);
