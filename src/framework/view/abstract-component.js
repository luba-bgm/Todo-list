import { createElement } from "../render.js";
 
export default class AbstractComponent {
  #element = null;
  constructor() {
      if (new.target === AbstractComponent) {
          throw new Error("Can\'t instantiate AbstractComponent, only concrete one.");
      }
  }

  get template() {
      throw new Error("Abstract method not implemented: get template");
  }

  get element() {
      if (!this.#element) {
          this.#element = createElement(this.template);
      }

      return this.#element;
  }

  removeElement() {
      this.#element = null;
  }
}