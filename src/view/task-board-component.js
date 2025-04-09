import AbstractComponent from "../framework/view/abstract-component.js"

function createDeskTemplate() {
    return (
        `<div class="tasks"></div>`
    );
}

export default class DeskComponent extends AbstractComponent {
    get template() {
        return createDeskTemplate();
    }
}