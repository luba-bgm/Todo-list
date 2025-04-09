import AbstractComponent from "../framework/view/abstract-component.js";
 
 function createClearButtonTemplate() {
     return (
         `
         <button class="clear-button">Очистить</button>
         `
     )
 }

 export default class ClearButtonComponent extends AbstractComponent {
     get template() {
         return createClearButtonTemplate();
     }
 }
