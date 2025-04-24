import AbstractComponent from "../framework/view/abstract-component.js";
 
 function createClearButtonTemplate() {
     return (
         `
         <button class="clear-button" type='submit'>Очистить</button>
         `
     )
 }

 export default class ClearButtonComponent extends AbstractComponent {
    #handleClick = null;
 
     constructor({onClick}) {
         super();
         this.#handleClick = onClick;
         this.element.addEventListener('click', this.#clearHandler);
     } 
     
    get template() {
         return createClearButtonTemplate();
     }

     #clearHandler = (evt) => {
        evt.preventDefault();
        if (!this.element.disabled) {
            this.#handleClick();
          }
        };
      
        disable() {
          this.element.disabled = true;
        }
      
        enable() {
          this.element.disabled = false;
        }
      }
      
