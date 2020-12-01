import {createElement} from "../utils";

const createNewEmojiListTemplate = (emogi) => {
  return new Array(emogi.length).fill().map((currElement, index) => {
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emogi[index]}" value="${emogi[index]}">
              <label class="film-details__emoji-label" for="emoji-${emogi[index]}">
                <img src="./images/emoji/${emogi[index]}.png" width="30" height="30" alt="emoji">
              </label>`;
  }).join(` `);
};

const createNewFilmCommentTemplate = (emojis) => {
  const emojiItems = createNewEmojiListTemplate(emojis);

  return `<div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
                ${emojiItems}
            </div>`;
};

export default class NewComment {
  constructor(emojis) {
    this._emojis = emojis;
    this._element = null;
  }

  getTemplate() {
    return createNewFilmCommentTemplate(this._emojis);
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
