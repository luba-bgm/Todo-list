import BaseComponent from "../framework/base-component.js";

function createTaskTemplate() {
    return `
        <li class="task-item">Название первой задачи</li>
    `;
}

export default class TaskComponent extends BaseComponent {
    getTemplate() {
        return createTaskTemplate();
    }
}