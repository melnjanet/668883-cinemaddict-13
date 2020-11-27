const createCommentsListTemplate = (comments) => {
  return new Array(comments.length).fill().map((currElement, index) => {
    const {emoji, text, author, date} = comments[index];

    return `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
              </span>
              <div>
                <p class="film-details__comment-text">${text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`;
  }).join(` `);
};

export const createFilmCommentsTemplate = (comments) => {
  const commentItems = createCommentsListTemplate(comments);
  const commentsCount = comments.length;

  return `<section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count"> ${commentsCount}</span></h3>

          <ul class="film-details__comments-list">
            ${commentItems}
          </ul>

        </section>`;
};
