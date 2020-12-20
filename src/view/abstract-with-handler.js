import AbstractView from "./abstract.js";

export default class AbstractWithHandler extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._callback.keydown(evt);
    }
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  setEscKeyDownHandler(callback) {
    this._callback.keydown = callback;

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }
}
