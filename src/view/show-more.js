import AbstractWithHandler from "./abstract-with-handler.js";

export const createShowMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMore extends AbstractWithHandler {
  getTemplate() {
    return createShowMoreTemplate();
  }
}

