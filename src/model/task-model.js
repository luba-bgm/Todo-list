import { tasks } from '../mock/tasks.js';
import { Status } from "../const.js";
import { generateID } from "../utils.js";

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }

    getTasksByStatus(status) {
        return this.#boardtasks.find(task => task.status === status);
    }
    

    addTask(title) {
        const newTask = {
            name: title,
            id: generateID(),
        };
    
        const backlogColumn = this.getTasksByStatus(Status.BACKLOG);
    
        if (!backlogColumn) {
            this.#boardtasks.unshift({
                status: Status.BACKLOG,
                tasks: [newTask]
            });
        } else {
            backlogColumn.tasks.push(newTask);
        }
    
        this._notifyObservers();
    }
    

    removeBasketTask() {
        const basketColumn = this.getTasksByStatus(Status.BASKET);
    
        if (basketColumn && Array.isArray(basketColumn.tasks)) {
            basketColumn.tasks.length = 0;
            this._notifyObservers();
        }
    }
    
    
    addObserver(observer){
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers(){
        this.#observers.forEach((observer) => observer());
    }
}
