import { tasks } from '../mock/tasks.js';

export default class TasksModel {
    #boardtasks = tasks;

    getTasks() {
        return this.#boardtasks;
    }
}
