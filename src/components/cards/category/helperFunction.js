import { STORE } from "./constant";
import { produce } from "immer";

function updateTodoItemsInStore(todoItems) {
    localStorage.setItem(STORE.LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todoItems));
}

function findTodoIndex(todoId, category, todoItems) {
    let index = -1;
    todoItems[category].forEach((todoItem, idx) => {
        if (todoItem.id === todoId) {
            return (index = idx);
        }
    });
    return index;
}

export function addNewTodo(todoTask, category, todoItems) {
    if (todoTask.trim() === "") {
        return todoItems;
    }
    const isPresent = todoItems.hasOwnProperty(category);
    const newTodo = new createTodo(todoTask);
    let clonedTodoItems = produce(todoItems, (draft) => {
        if (!isPresent) {
            draft[category] = [];
        }
        draft[category].push(newTodo.toJSON());
    });
    updateTodoItemsInStore(clonedTodoItems);
    return clonedTodoItems;
}

export function completeTodo(todoId, category, todoItems) {
    const todoIndex = findTodoIndex(todoId, category, todoItems);
    if (todoIndex === -1) {
        return todoItems;
    }
    const clonedTodoItems = produce(todoItems, (draft) => {
        draft[category][todoIndex].isChecked = !draft[category][todoIndex].isChecked;
    });
    updateTodoItemsInStore(clonedTodoItems);
    return clonedTodoItems;
}

export function pinTodo(todoId, category, todoItems) {
    const todoIndex = findTodoIndex(todoId, category, todoItems);
    if (todoIndex === -1) {
        return todoItems;
    }

    const clonedTodoItems = produce(todoItems, (draft) => {
        const entry = draft[category][todoIndex];
        draft[category].splice(todoIndex, 1);
        entry.isPin = !entry.isPin;
        entry.id = new Date().valueOf();

        entry.isPin ? draft[category].unshift(entry) : draft[category].push(entry);
    });
    updateTodoItemsInStore(clonedTodoItems);
    return clonedTodoItems;
}

export function deleteTodo(todoId, category, todoItems) {
    const todoIndex = findTodoIndex(todoId, category, todoItems);
    if (todoIndex === -1) {
        return todoItems;
    }
    const clonedTodoItems = produce(todoItems, (draft) => {
        draft[category].splice(todoIndex, 1);
        if (draft[category].length === 0) {
            delete draft[category];
        }
    });
    updateTodoItemsInStore(clonedTodoItems);
    return clonedTodoItems;
}

export class createTodo {
    #_id;
    #_task;
    #_isChecked;
    #_isPin;

    constructor(task, isChecked = false, isPin = false) {
        this.#_id = new Date().valueOf();
        this.#_task = task;
        this.#_isChecked = isChecked;
        this.#_isPin = isPin;
    }

    get id() {
        return this.#_id;
    }
    get task() {
        return this.#_task;
    }
    get isChecked() {
        return this.#_isChecked;
    }
    get isPin() {
        return this.#_isPin;
    }
    set id(newId) {
        this.#_id = newId;
    }
    set task(value) {
        this.#_task = value;
    }
    set isChecked(isComplete) {
        this.#_isChecked = isComplete;
    }
    set isPin(isPin) {
        this.#_isPin = isPin;
    }

    toJSON() {
        return {
            id: this.id,
            task: this.task,
            isChecked: this.isChecked,
            isPin: this.isPin,
        };
    }
}
