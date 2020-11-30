import {EMOJIS, MAX_FILMS_NUMBER, FILM_COUNT_PER_STEP, MAX_EXTRA_FILM_CARD_NUMBER} from "./const.js";
import {genreTitle, getRandomInteger} from "./utils.js";
import {createMainNavigationTemplate} from "./view/main-navigation";
import {createSortListTemplate} from "./view/sort-list";
import {createProfileTemplate} from "./view/profile";
import {createStatisticTemplate} from "./view/statistic";
import {createFilmsTemplate} from "./view/films";
import {createFilmCardTemplate} from "./view/film-card";
import {createShowMoreTemplate} from "./view/show-more";
import {createFilmsListExtra} from "./view/films-list-extra";
import {createFilmDetailsTemplate} from "./view/film-details";
import {createFilmCommentsTemplate} from "./view/film-comments";
import {createNewFilmCommentTemplate} from "./view/new-film-comment";
import {createFooterStatisticsTemplate} from "./view/footer-statistics";
import {generateFilmCard} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";
import {generateComment} from "./mock/comments";

const filmCards = new Array(MAX_FILMS_NUMBER).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);
const comments = new Array(5).fill().map(generateComment);

const siteHideOverflow = document.contains(document.querySelector(`.hide-overflow`)) ? document.querySelector(`.hide-overflow`) : ``;
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createMainNavigationTemplate(filters), `beforeend`);
render(siteMainElement, createSortListTemplate(), `beforeend`);
render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createStatisticTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const siteFilmsElement = siteMainElement.querySelector(`.films`);
const siteFilmsListElement = siteFilmsElement.querySelector(`.films-list`);
const siteFilmsListContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_PER_STEP); i++) {
  render(siteFilmsListContainerElement, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

if (filmCards.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCardsCount = FILM_COUNT_PER_STEP;
  render(siteFilmsListElement, createShowMoreTemplate(), `beforeend`);

  const loadMoreButton = document.querySelector(`.films-list__show-more`);
  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    filmCards
      .slice(renderedFilmCardsCount, renderedFilmCardsCount + FILM_COUNT_PER_STEP)
      .forEach((filmCard) => render(siteFilmsListContainerElement, createFilmCardTemplate(filmCard), `beforeend`));

    renderedFilmCardsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCardsCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  });
}

render(siteFilmsElement, createFilmsListExtra(), `beforeend`);

const siteFilmsListExtraElements = siteFilmsElement.querySelectorAll(`.films-list--extra`);

siteFilmsListExtraElements.forEach((item) => {
  let siteFilmSListContainer = item.querySelector(`.films-list__container`);

  for (let i = 0; i < MAX_EXTRA_FILM_CARD_NUMBER; i++) {
    render(siteFilmSListContainer, createFilmCardTemplate(filmCards[getRandomInteger(0, filmCards.length - 1)]), `beforeend`);
  }
});

render(siteFooterElement, createFooterStatisticsTemplate(MAX_FILMS_NUMBER), `beforeend`);

if (siteHideOverflow) {
  render(siteHideOverflow, createFilmDetailsTemplate(filmCards[0], genreTitle), `beforeend`);

  const filmDetailsBottomContainer = siteHideOverflow.querySelector(`.film-details__bottom-container`);
  render(filmDetailsBottomContainer, createFilmCommentsTemplate(comments[filmCards[0].comments]), `beforeend`);

  const filmDetails = siteHideOverflow.querySelector(`.film-details__comments-wrap`);
  render(filmDetails, createNewFilmCommentTemplate(EMOJIS), `beforeend`);
}
