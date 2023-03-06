import { STORE } from "./constant";
import { produce } from "immer";

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function updateTodoItemsInStore(todoItems) {
    localStorage.setItem(STORE.LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todoItems));
}

export function updateCategoriesinStore(todoCategories) {
    localStorage.setItem(
        STORE.LOCAL_STORAGE_TODO_CATEGORIES_KEY,
        JSON.stringify(todoCategories)
    );
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

export function addNewCategory(newCategory, todoCategories) {
    if (newCategory.trim() === "") {
        return todoCategories;
    }
    newCategory = capitalizeFirstLetter(newCategory);

    const isPresent = todoCategories.includes(newCategory);
    if (isPresent) {
        return todoCategories;
    }
    const clonedTodoCategories = produce(todoCategories, (draft) => {
        draft.push(newCategory);
    });
    updateCategoriesinStore(clonedTodoCategories);
    return clonedTodoCategories;
}

export function addNewTodo(todoTask, category, todoItems) {
    if (todoTask.trim() === "") {
        return todoItems;
    }
    const isPresent = todoItems.hasOwnProperty(category);
    const newTodo = new createTodo(todoTask);
    const clonedTodoItems = produce(todoItems, (draft) => {
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

export function saveTodo(todoId, category, content, todoItems) {
    const todoIndex = findTodoIndex(todoId, category, todoItems);
    if (todoIndex === -1) {
        return;
    }
    const clonedTodoItems = produce(todoItems, (draft) => {
        draft[category][todoIndex].task = content;
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

    constructor(task) {
        this.#_id = new Date().valueOf();
        this.#_task = task;
        this.#_isChecked = false;
        this.#_isPin = false;
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
