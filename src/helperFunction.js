import { LOCAL_STORAGE_TODOS_KEY, LOCAL_STORAGE_TODO_CATEGORIES_KEY } from "./constant";

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function saveTodoItems(todoItems) {
    localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todoItems));
}

export function saveTodoCategories(todoCategories) {
    localStorage.setItem(
        LOCAL_STORAGE_TODO_CATEGORIES_KEY,
        JSON.stringify(todoCategories)
    );
}

export const findTodoIndex = (todoId, category, todoItems) => {
    for (let todoIndex = 0; todoIndex < todoItems[category].length; todoIndex++) {
        if (todoItems[category][todoIndex].id === todoId) {
            return todoIndex;
        }
    }
    return -1;
};

export const addNewCategoryHelper = (newCategory, clonedTodoCategories) => {
    newCategory = capitalizeFirstLetter(newCategory);

    const isPresent = clonedTodoCategories.includes(newCategory);
    if (isPresent) {
        return clonedTodoCategories;
    }
    clonedTodoCategories.push(newCategory);
    return clonedTodoCategories;
};

export const addNewTodoHelper = (todoTask, category, clonedTodoItems) => {
    const isPresent = clonedTodoItems.hasOwnProperty(category);
    const newTodo = createTodo(todoTask);
    if (!isPresent) {
        clonedTodoItems[category] = [];
    }
    clonedTodoItems[category].push(newTodo);
    return clonedTodoItems;
};

export const handlePinButtonClickHelper = (category, todoIndex, clonedTodoItems) => {
    const entry = clonedTodoItems[category][todoIndex];
    clonedTodoItems[category].splice(todoIndex, 1);
    entry.isPin = !entry.isPin;
    entry.id = new Date().valueOf();

    entry.isPin
        ? clonedTodoItems[category].unshift(entry)
        : clonedTodoItems[category].push(entry);
    return clonedTodoItems;
};

export const createTodo = (todo) => {
    return {
        id: new Date().valueOf(),
        task: todo,
        isChecked: false,
        isPin: false,
    };
};
