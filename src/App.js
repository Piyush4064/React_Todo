import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import CategoriesContainer from "./components/cards/CategoriesContainer";

import "./app.css";
import { LOCAL_STORAGE_TODOS_KEY, LOCAL_STORAGE_TODO_CATEGORIES_KEY } from "./constant";

import {
    saveTodoItems,
    saveTodoCategories,
    findTodoIndex,
    addNewCategoryHelper,
    addNewTodoHelper,
    handlePinButtonClickHelper,
} from "./helperFunction";

function App() {
    const [todoItems, setTodoItems] = useState({});
    const [todoCategories, setTodoCategories] = useState(["Work"]);

    useEffect(() => {
        const DUMMY_TODOS =
            JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY)) || {};
        const DUMMY_TODO_CATEGORIES = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_TODO_CATEGORIES_KEY)
        ) || ["Work"];

        setTodoItems(DUMMY_TODOS);
        setTodoCategories(DUMMY_TODO_CATEGORIES);
    }, []);

    const addNewCategory = (newCategory) => {
        if (newCategory.trim() === "") {
            return;
        }
        const clonedTodoCategories = addNewCategoryHelper(newCategory, [
            ...todoCategories,
        ]);
        saveTodoCategories(clonedTodoCategories);
        setTodoCategories(clonedTodoCategories);
    };

    const addNewTodo = (todoTask, category) => {
        if (todoTask.trim() === "") {
            return;
        }
        const clonedTodoItems = addNewTodoHelper(todoTask, category, { ...todoItems });
        saveTodoItems(clonedTodoItems);
        setTodoItems(clonedTodoItems);
    };

    const handleCheckBoxClick = (todoId, category) => {
        const todoIndex = findTodoIndex(todoId, category, todoItems);
        if (todoIndex === -1) {
            return;
        }
        const clonedTodoItems = { ...todoItems };

        clonedTodoItems[category][todoIndex].isChecked =
            !clonedTodoItems[category][todoIndex].isChecked;
        saveTodoItems(clonedTodoItems);
        setTodoItems(clonedTodoItems);
    };

    const handleInputSpanEnter = (todoId, category, content) => {
        if (content.trim() === "") {
            handleDeleteButtonClick(todoId, category);
            return;
        }
        const todoIndex = findTodoIndex(todoId, category, todoItems);
        if (todoIndex === -1) {
            return;
        }

        const clonedTodoItems = { ...todoItems };

        clonedTodoItems[category][todoIndex].task = content;
        saveTodoItems(clonedTodoItems);
        setTodoItems(clonedTodoItems);
    };

    const handleDeleteButtonClick = (todoId, category) => {
        const todoIndex = findTodoIndex(todoId, category, todoItems);
        if (todoIndex === -1) {
            return;
        }
        const clonedTodoItems = { ...todoItems };

        clonedTodoItems[category].splice(todoIndex, 1);
        if (clonedTodoItems[category].length === 0) {
            delete clonedTodoItems[category];
        }
        saveTodoItems(clonedTodoItems);
        setTodoItems(clonedTodoItems);
    };

    const handlePinButtonClick = (todoId, category) => {
        const todoIndex = findTodoIndex(todoId, category, todoItems);
        if (todoIndex === -1) {
            return;
        }
        const clonedTodoItems = handlePinButtonClickHelper(category, todoIndex, {
            ...todoItems,
        });
        saveTodoItems(clonedTodoItems);
        setTodoItems(clonedTodoItems);
    };

    return (
        <div className="App">
            <Header
                todoCategories={todoCategories}
                addNewCategory={addNewCategory}
                addNewTodo={addNewTodo}
            />
            <CategoriesContainer
                todoItems={todoItems}
                handleCheckBoxClick={handleCheckBoxClick}
                handleInputSpanEnter={handleInputSpanEnter}
                handleDeleteButtonClick={handleDeleteButtonClick}
                handlePinButtonClick={handlePinButtonClick}
            />
        </div>
    );
}

export default App;
