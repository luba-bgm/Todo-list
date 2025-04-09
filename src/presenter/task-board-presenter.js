import TasksListComponent from "../view/task-list-component.js";
import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';
import DeskComponent from "../view/task-board-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import StubComponent from "../view/stub-component.js";

export default class TaskBoardPresenter {

    #taskDeskComponent = new DeskComponent();
    #boardContainer = null;
    #boardtasks = [];
    #tasksModel = null;

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardtasks = this.#tasksModel.tasks; 

        render(this.#taskDeskComponent, this.#boardContainer);

        this.#boardtasks.forEach((taskList) => {
            this.#renderTaskList(taskList.status, taskList.tasks);
        });

        this.#renderClearButton();
     }

     #renderTask(task, container) {
        render(new TaskComponent(task), container.element.querySelector('.task-container'));
    }

    #renderTaskList(status, tasks) {
        const list = new TasksListComponent(status);

        render(list, this.#taskDeskComponent.element);

        tasks.length === 0 ? this.#renderStubComponent(list) : tasks.forEach((task) => {
            this.#renderTask(task, list);
        });
    }

    #renderClearButton() {
        const basketContainer = document.querySelector('.basket');

        if (basketContainer) {
            render(new ClearButtonComponent(), basketContainer);
        }
    }

    #renderStubComponent(container) {
        render(new StubComponent(), container.element);
    }
}