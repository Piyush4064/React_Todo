import { STORE } from "./constant";
import { produce } from "immer";

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function updateCategoriesinStore(todoCategories) {
    localStorage.setItem(
        STORE.LOCAL_STORAGE_TODO_CATEGORIES_KEY,
        JSON.stringify(todoCategories)
    );
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
