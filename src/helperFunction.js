import { LOCAL_STORAGE_TODOS_KEY, LOCAL_STORAGE_TODO_CATEGORIES_KEY } from "./constant";

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function saveTodoItems(todoItems) {
    localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todoItems));
}

export function saveTodoCategories(todoCategories) {
    localStorage.setItem(
        LOCAL_STORAGE_TODO_CATEGORIES_KEY,
        JSON.stringify(todoCategories)
    );
}

const findTodoIndex = (todoId, category, todoItems) => {
    for (let todoIndex = 0; todoIndex < todoItems[category].length; todoIndex++) {
        if (todoItems[category][todoIndex].id === todoId) {
            return todoIndex;
        }
    }
    return -1;
};

export const addNewCategoryHelper = (newCategory, clonedTodoCategories) => {
    if (newCategory.trim() === "") {
        return clonedTodoCategories;
    }
    newCategory = capitalizeFirstLetter(newCategory);

    const isPresent = clonedTodoCategories.includes(newCategory);
    if (isPresent) {
        return clonedTodoCategories;
    }
    clonedTodoCategories.push(newCategory);
    saveTodoCategories(clonedTodoCategories);
    return clonedTodoCategories;
};

export const addNewTodoHelper = (todoTask, category, clonedTodoItems) => {
    if (todoTask.trim() === "") {
        return clonedTodoItems;
    }
    const isPresent = clonedTodoItems.hasOwnProperty(category);
    const newTodo = createTodo(todoTask);
    if (!isPresent) {
        clonedTodoItems[category] = [];
    }
    clonedTodoItems[category].push(newTodo);
    saveTodoItems(clonedTodoItems);
    return clonedTodoItems;
};

export const handleCheckBoxClickHelper = (todoId, category, clonedTodoItems) => {
    const todoIndex = findTodoIndex(todoId, category, clonedTodoItems);
    if (todoIndex === -1) {
        return clonedTodoItems;
    }

    clonedTodoItems[category][todoIndex].isChecked =
        !clonedTodoItems[category][todoIndex].isChecked;
    saveTodoItems(clonedTodoItems);
    return clonedTodoItems;
};

export const handleInputSpanEnterHelper = (
    todoId,
    category,
    content,
    clonedTodoItems
) => {
    const todoIndex = findTodoIndex(todoId, category, clonedTodoItems);
    if (todoIndex === -1) {
        return;
    }

    clonedTodoItems[category][todoIndex].task = content;
    saveTodoItems(clonedTodoItems);
    return clonedTodoItems;
};

export const handleDeleteButtonClickHelper = (todoId, category, clonedTodoItems) => {
    const todoIndex = findTodoIndex(todoId, category, clonedTodoItems);
    if (todoIndex === -1) {
        return clonedTodoItems;
    }

    clonedTodoItems[category].splice(todoIndex, 1);
    if (clonedTodoItems[category].length === 0) {
        delete clonedTodoItems[category];
    }
    saveTodoItems(clonedTodoItems);
    return clonedTodoItems;
};

export const handlePinButtonClickHelper = (todoId, category, clonedTodoItems) => {
    const todoIndex = findTodoIndex(todoId, category, clonedTodoItems);
    if (todoIndex === -1) {
        return clonedTodoItems;
    }
    const entry = clonedTodoItems[category][todoIndex];
    clonedTodoItems[category].splice(todoIndex, 1);
    entry.isPin = !entry.isPin;
    entry.id = new Date().valueOf();

    entry.isPin
        ? clonedTodoItems[category].unshift(entry)
        : clonedTodoItems[category].push(entry);
    saveTodoItems(clonedTodoItems);
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
