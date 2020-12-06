import AbstractView from "./abstract.js";

export const createFooterStatisticsTemplate = (totalFilms) => {
  return `<section class="footer__statistics">
    <p>${totalFilms} movies inside</p>
  </section>`;
};


export default class FooterStatistics extends AbstractView {
  constructor(totalFilms) {
    super();
    this._totalFilms = totalFilms;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._totalFilms);
  }
}
