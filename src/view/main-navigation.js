const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  const filterName = name[0].toUpperCase() + name.slice(1);

  return `<a href="#${name}" class="main-navigation__item">${filterName}
        <span class="main-navigation__item-count">${count}</span>
        </a>`;
};

export const createMainNavigationTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item">All movies</a>
        ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
