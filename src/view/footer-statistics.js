import {createElement} from "../utils";

export const createFooterStatisticsTemplate = (totalFilms) => {
  return `<section class="footer__statistics">
    <p>${totalFilms} movies inside</p>
  </section>`;
};


export default class FooterStatistics {
  constructor(totalFilms) {
    this._totalFilms = totalFilms;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._totalFilms);
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
