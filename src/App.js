import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import CategoriesContainer from "./components/cards/CategoriesContainer";

import "./app.css";
import { LOCAL_STORAGE_TODOS_KEY, LOCAL_STORAGE_TODO_CATEGORIES_KEY } from "./constant";

import {
    addNewCategoryHelper,
    addNewTodoHelper,
    handleCheckBoxClickHelper,
    handleInputSpanEnterHelper,
    handleDeleteButtonClickHelper,
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
        const clonedTodoCategories = addNewCategoryHelper(newCategory, [
            ...todoCategories,
        ]);
        setTodoCategories(clonedTodoCategories);
    };

    const addNewTodo = (todoTask, category) => {
        const clonedTodoItems = addNewTodoHelper(todoTask, category, { ...todoItems });
        setTodoItems(clonedTodoItems);
    };

    const handleCheckBoxClick = (todoId, category) => {
        const clonedTodoItems = handleCheckBoxClickHelper(todoId, category, {
            ...todoItems,
        });
        setTodoItems(clonedTodoItems);
    };

    const handleInputSpanEnter = (todoId, category, content) => {
        if (content.trim() === "") {
            handleDeleteButtonClick(todoId, category);
            return;
        }
        const clonedTodoItems = handleInputSpanEnterHelper(todoId, category, content, {
            ...todoItems,
        });
        setTodoItems(clonedTodoItems);
    };

    const handleDeleteButtonClick = (todoId, category) => {
        const clonedTodoItems = handleDeleteButtonClickHelper(todoId, category, {
            ...todoItems,
        });
        setTodoItems(clonedTodoItems);
    };

    const handlePinButtonClick = (todoId, category) => {
        const clonedTodoItems = handlePinButtonClickHelper(todoId, category, {
            ...todoItems,
        });
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
