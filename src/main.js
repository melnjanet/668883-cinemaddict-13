import {MAX_FILMS_NUMBER} from "./const.js";
import {RenderPosition, render} from "./utils/render.js";

import {generateFilmCard} from "./mock/film.js";
import {generateFilter} from "./mock/filter.js";

import MainNavigationView from "./view/main-navigation.js";
import ProfileView from "./view/profile.js";
// import StatisticView from "./view/statistic.js";
import FilmsView from "./view/films.js";
import PagePresenter from "./presenter/page.js";

import TopRatedView from "./view/top-rated.js";
import MostCommentedView from "./view/most-commented.js";
import FooterStatisticsView from "./view/footer-statistics.js";

const filmCards = new Array(MAX_FILMS_NUMBER).fill().map(generateFilmCard);
const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const filmsComponent = new FilmsView();
const pagePresenter = new PagePresenter(siteMainElement);

render(siteMainElement, new MainNavigationView(filters), RenderPosition.BEFOREEND);
render(siteHeaderElement, new ProfileView(), RenderPosition.BEFOREEND);
// render(siteMainElement, new StatisticView(), RenderPosition.BEFOREEND);

pagePresenter.init(filmCards);

render(filmsComponent, new TopRatedView(), RenderPosition.BEFOREEND);
render(filmsComponent, new MostCommentedView(), RenderPosition.BEFOREEND);
render(siteFooterElement, new FooterStatisticsView(MAX_FILMS_NUMBER), RenderPosition.BEFOREEND);
