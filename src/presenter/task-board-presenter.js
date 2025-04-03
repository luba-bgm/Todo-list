import TasksListComponent from "../view/task-list.js";
import TaskComponent from '../view/task.js';
import { render } from '../framework/render.js';
import DeskComponent from "../view/task-board.js";
import ClearButtonComponent from "../view/clear-button.js";
import { Status } from "../const.js"; 

export default class TaskBoadPresenter {
    #taskDeskComponent = new DeskComponent();
    #boardContainer = null;
    #boardtasks = [];
    #tasksModel = null;

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardtasks = this.#tasksModel.getTasks(); 

        render(this.#taskDeskComponent, this.#boardContainer);

        Object.values(Status).forEach(status => {
            const tasksForStatus = this.#boardtasks.filter(task => task.status === status);
            const list = new TasksListComponent({ status });

            render(list, this.#taskDeskComponent.getElement());

            tasksForStatus.forEach(task => {
                render(new TaskComponent({ task }), list.getElement().querySelector('.task-container'));
            });
        });

        const basketContainer = document.querySelector('.basket');
        if (basketContainer) {
            render(new ClearButtonComponent(), basketContainer);
        }
    }
}
