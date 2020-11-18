import {createMainNavigationTemplate} from "./view/main-navigation";
import {createSortListTemplate} from "./view/sort-list";
import {createProfileTemplate} from "./view/profile";
import {createStatisticTemplate} from "./view/statistic";
import {createFilmsTemplate} from "./view/films";
import {createFilmCardTemplate} from "./view/film-card";
import {createShowMoreTemplate} from "./view/show-more";
import {createFilmsListExtra} from "./view/films-list-extra";
import {createFilmDetailsTemplate} from "./view/film-details";
import {createFooterStatisticsTemplate} from "./view/footer-statistics";

const MAX_FILM_CARD_NUMBER = 5;
const MAX_EXTRA_FILM_CARD_NUMBER = 2;
const siteHideOverflow = document.contains(document.querySelector(`.hide-overflow`)) ? document.querySelector(`.hide-overflow`) : ``;
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderExtraListElements = (selector, method) => {
  for (let i = 0; i < MAX_EXTRA_FILM_CARD_NUMBER; i++) {
    render(selector, method, `beforeend`);
  }
};

render(siteMainElement, createMainNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortListTemplate(), `beforeend`);
render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteMainElement, createStatisticTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const siteFilmsElement = siteMainElement.querySelector(`.films`);
const siteFilmsListElement = siteFilmsElement.querySelector(`.films-list`);

const siteFilmsListContainerElement = siteFilmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < MAX_FILM_CARD_NUMBER; i++) {
  render(siteFilmsListContainerElement, createFilmCardTemplate(), `beforeend`);
}

render(siteFilmsListElement, createShowMoreTemplate(), `beforeend`);
render(siteFilmsElement, createFilmsListExtra(), `beforeend`);

const siteFilmsListExtraElements = siteFilmsElement.querySelectorAll(`.films-list--extra`);

siteFilmsListExtraElements.forEach((item, index) => {
  let siteFilmSListContainer = item.querySelector(`.films-list__container`);

  if (index === 0) {
    renderExtraListElements(siteFilmSListContainer, createFilmCardTemplate());
  } else {
    renderExtraListElements(siteFilmSListContainer, createFilmCardTemplate());
  }
});

render(siteFooterElement, createFooterStatisticsTemplate(), `beforeend`);

if (siteHideOverflow) {
  render(siteHideOverflow, createFilmDetailsTemplate(), `beforeend`);
}
