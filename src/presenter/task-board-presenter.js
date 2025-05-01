import TasksListComponent from "../view/task-list-component.js";
import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';
import DeskComponent from "../view/task-board-component.js";
import StubComponent from "../view/stub-component.js";
import ClearButtonComponent from "../view/clear-button-component.js";
import { Status } from "../const.js"; 
import LoadingViewComponent from "../view/loading-view-component.js";
import { UserAction } from "../const.js";


export default class TaskBoardPresenter {
    #loadingComponent = new LoadingViewComponent();
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

    async createTask() {
        const taskTitle = document.querySelector('.add-new').value.trim();
        if (!taskTitle) {
            return;
        }

        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.add-new').value = '';
        } catch(err) {
            console.error('Ошибка при создании задачи: ', err);
            throw err;
        }
    }



    async init() {
        render(this.#loadingComponent, this.#boardContainer);
        await this.#tasksModel.init();
        this.#clearBoard();
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

     async clearBasket() {
        try {
            await this.#tasksModel.removeBasketTask();
        } catch(err) {
            console.error('Ошибка при очистке корзины: ', err);
        }
    }

    #renderTaskList(status, tasks) {
        const list = new TasksListComponent(status, this.#handleTaskDrop.bind(this));

        render(list, this.#taskDeskComponent.element);

        tasks.length === 0 ? this.#renderStubComponent(list) : tasks.forEach((task) => {
            this.#renderTask(task, list);
        });
        
        this.#loadingComponent.element.style = 'display: none;';
    }

    #renderTask(task, container) {
        render(new TaskComponent(task), container.element.querySelector('ul'));
    }

    #renderClearButton() {
        const basketContainer = document.querySelector('.basket');
      
        if (!basketContainer) return;
      
        render(this.#clearButtonComponent, basketContainer);
      
        const basketTasks = this.#tasksModel.getTasksByStatus(Status.BASKET)?.tasks || [];
      
        if (basketTasks.length === 0) {
          this.#clearButtonComponent.disable();
        } else {
          this.#clearButtonComponent.enable();
        }
      }
      
    
      async #handleTaskDrop(newStatus, taskId, droppedTask) {
        try {
            await this.#tasksModel.updateTaskStatus(newStatus, taskId, droppedTask);
        } catch(err) {
            console.error('Ошибка при обновлении статуса задачи: ', err);
        }
    }

    #renderStubComponent(container) {
        render(new StubComponent(), container.element);
    }


    #clearBoard() {
        this.#taskDeskComponent.element.innerHTML = '';
    }

    #handleModelChange(event, payload) {
        switch(event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                break;
        }
    }
    
}