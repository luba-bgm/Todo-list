import { tasks } from '../mock/tasks.js';

export default class TasksModel {
    #boardtasks = tasks;

    get tasks() {
        return this.#boardtasks;
    }
}
