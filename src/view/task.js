import BaseComponent from "../framework/base-component.js";

function createTaskTemplate(task) {
    return `<li>${task.title}</li>`;
}

export default class TaskComponent extends BaseComponent {
    constructor({ task }) {
        super();
        this.task = task;
    }

    getTemplate() {
        return createTaskTemplate(this.task);
    }
}
