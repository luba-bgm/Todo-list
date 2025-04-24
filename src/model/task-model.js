import { tasks } from '../mock/tasks.js';
import { OrderPosition, Status } from "../const.js";
import { generateID } from "../utils.js";


export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }

    getTaskInfoById(taskId) {
        for (const listTask of this.#boardtasks) {
            const taskById = listTask.tasks.filter(t => t.id === taskId)[0];

            if (taskById) {
                const currStatus = listTask.status;

                return [ currStatus, taskById ];
            }
        }
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
    
    removeTaskFromStatus(task, status) {
        const listTaskOfStatus = this.getTasksByStatus(status);

        const indexTask = listTaskOfStatus.tasks.indexOf(task);

        if (indexTask > -1) {
            listTaskOfStatus.tasks.splice(indexTask, 1);
        }
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

    updateTaskStatus(newStatus, taskId, droppedTask) {
        const [oldStatus, task] = this.getTaskInfoById(taskId);

        if (task && oldStatus != newStatus) {
            const taskByStatus = this.getTasksByStatus(newStatus);
            const order = droppedTask.order;
 
            if (order === OrderPosition.START || order === OrderPosition.END) {
                const indexSet = order === OrderPosition.START ? 0 : taskByStatus.tasks.length;
                taskByStatus.tasks.splice(indexSet, 0, task);
            } else {
                const indexDroppedTask = taskByStatus.tasks.indexOf(this.getTaskInfoById(droppedTask.taskId)[1]) + (order === OrderPosition.ABOVE ? 0 : 1);
                 taskByStatus.tasks.splice(indexDroppedTask, 0, task);
             }
            this.removeTaskFromStatus(task, oldStatus);

            this._notifyObservers();
        }
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers(){
        this.#observers.forEach((observer) => observer());
    }
}
