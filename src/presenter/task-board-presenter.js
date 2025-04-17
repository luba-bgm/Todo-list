import TasksListComponent from "../view/task-list-component.js";
import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';
import DeskComponent from "../view/task-board-component.js";
import StubComponent from "../view/stub-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";


export default class TaskBoardPresenter {

    #taskDeskComponent = new DeskComponent();
    #boardContainer = null;
    #boardtasks = [];
    #tasksModel = null;
    #clearButtonComponent = null;

    constructor({boardContainer, tasksModel, clearButtonComponent}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#clearButtonComponent = clearButtonComponent;
         this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
     }

     createTask() {
        const taskTitle = document.querySelector('.add-new').value.trim();
        if (!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);

        document.querySelector('.add-new').value = '';
    }



    init() {
        this.#renderBoard();
     }
 
     #renderBoard() {
         if (this.#tasksModel.tasks.length != this.#boardtasks.length) {
             this.#boardtasks = [...this.#tasksModel.tasks];
         }
 
         render(this.#taskDeskComponent, this.#boardContainer);
         
 
         this.#boardtasks.forEach((taskList) => {
             this.#renderTaskList(taskList.status, taskList.tasks);
         });
 
         this.#renderClearButton();
     }

     clearBasket() {
        this.#tasksModel.removeBasketTask();
    }

    #renderTaskList(status, tasks) {
        const list = new TasksListComponent(status);

        render(list, this.#taskDeskComponent.element);

        tasks.length === 0 ? this.#renderStubComponent(list) : tasks.forEach((task) => {
            this.#renderTask(task.name, list);
        });
    }

    #renderTask(task, container) {
        render(new TaskComponent(task), container.element.querySelector('.task-container'));
    }

    #renderClearButton() {
        const basketContainer = document.querySelector('.basket');
    
        if (basketContainer) {
            render(
                new ClearButtonComponent({ onClick: this.clearBasket.bind(this) }),
                basketContainer
            );
        }
    }
    

    #renderStubComponent(container) {
        render(new StubComponent(), container.element);
    }


    #clearBoard() {
        this.#taskDeskComponent.element.innerHTML = '';
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
    }
}