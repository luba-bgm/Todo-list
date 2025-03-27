import BaseComponent from "../framework/base-component.js";

function createDeskTemplate() {
    return (
        `<div class="tasks"></div>`
    );
}

export default class DeskComponent extends BaseComponent {
    getTemplate() {
        return createDeskTemplate();
    }
}