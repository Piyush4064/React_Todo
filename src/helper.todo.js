import { STORE } from "./constant";
import { produce } from "immer";
import { createTodo } from "./model";

function updateTodoItemsInStore(todoItems) {
    localStorage.setItem(STORE.LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todoItems));
}

function findTodoIndex(todoId, category, todoItems) {
    let index = todoItems[category].findIndex((todoItem) => todoItem.id === todoId);
    return index;
}

export function addNewTodo(todoTask, category, todoItems) {
    if (todoTask.trim() === "") {
        return todoItems;
    }
    const newTodo = new createTodo(todoTask);
    let clonedTodoItems = produce(todoItems, (draft) => {
        const prevTodoOfCategory = draft[category] || [];
        draft[category] = [...prevTodoOfCategory, newTodo.toJSON()];
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
