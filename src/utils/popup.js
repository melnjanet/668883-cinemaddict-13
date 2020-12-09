import Abstract from "../view/abstract.js";

export const popupToggle = (container, child, action) => {
  if (child instanceof Abstract) {
    child = child.getElement();
  }

  if (action) {
    container.appendChild(child);
  } else {
    container.removeChild(child);
  }
};
