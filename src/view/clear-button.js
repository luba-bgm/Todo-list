import BaseComponent from "../framework/base-component.js";
 
 function createClearButtonTemplate() {
     return (
         `
         <button class="clear-button">Очистить</button>
         `
     )
 }
 
 export default class ClearButtonComponent extends BaseComponent {
     getTemplate() {
         return createClearButtonTemplate();
     }
 }
