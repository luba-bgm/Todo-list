import { createElement } from "../render.js";
 
export default class AbstractComponent {
  #element = null;
  constructor() {
      if (new.target === AbstractComponent) {
          throw new Error("You cannot create an object of an abstract class");
      }
  }

  get template() {
      throw new Error("The abstract class does not have a method implemented: getTemplate");
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