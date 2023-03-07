import React, { useEffect, useState, useCallback } from "react";
import Header from "./components/forms";
import Container from "./components/cards";

import "./app.css";
import { STORE } from "./constant";

import {
    addNewCategory,
    addNewTodo,
    completeTodo,
    saveTodo,
    deleteTodo,
    pinTodo,
} from "./helperFunction";

function App() {
    const [todoItems, setTodoItems] = useState({});
    const [todoCategories, setTodoCategories] = useState(["Work"]);

    useEffect(() => {
        const DUMMY_TODOS =
            JSON.parse(localStorage.getItem(STORE.LOCAL_STORAGE_TODOS_KEY)) || {};
        const DUMMY_TODO_CATEGORIES = JSON.parse(
            localStorage.getItem(STORE.LOCAL_STORAGE_TODO_CATEGORIES_KEY)
        ) || ["Work"];
        setTodoItems(DUMMY_TODOS);
        setTodoCategories(DUMMY_TODO_CATEGORIES);
    }, []);

    const updateTodoItems = (clonedTodoItems) => {
        setTodoItems(clonedTodoItems);
    };
    const handleAddCategory = useCallback(
        (newCategory) => {
            const clonedTodoCategories = addNewCategory(newCategory, todoCategories);
            setTodoCategories(clonedTodoCategories);
        },
        [todoCategories]
    );

    const handleAddTodo = useCallback(
        (todoTask, category) => {
            const clonedTodoItems = addNewTodo(todoTask, category, todoItems);
            setTodoItems(clonedTodoItems);
        },
        [todoItems]
    );
    const handleCompleteTodo = useCallback(
        (todoId, category) => {
            const clonedTodoItems = completeTodo(todoId, category, todoItems);
            setTodoItems(clonedTodoItems);
        },
        [todoItems]
    );

    const handleDeleteTodo = useCallback(
        (todoId, category) => {
            const clonedTodoItems = deleteTodo(todoId, category, todoItems);
            setTodoItems(clonedTodoItems);
            return clonedTodoItems;
        },
        [todoItems]
    );

    const handleSaveTodo = useCallback(
        (todoId, category, content) => {
            if (content.trim() === "") {
                handleDeleteTodo(todoId, category);
                return;
            }
            const clonedTodoItems = saveTodo(todoId, category, content, todoItems);
            setTodoItems(clonedTodoItems);
        },
        [handleDeleteTodo, todoItems]
    );

    const handlePinTodo = useCallback(
        (todoId, category) => {
            const clonedTodoItems = pinTodo(todoId, category, todoItems);
            setTodoItems(clonedTodoItems);
        },
        [todoItems]
    );

    return (
        <div className="App">
            <Header
                todoCategories={todoCategories}
                addNewCategory={handleAddCategory}
                addNewTodo={handleAddTodo}
            />
            <Container
                todoItems={todoItems}
                updateTodoItems={updateTodoItems}
                handleCompleteTodo={handleCompleteTodo}
                handleSaveTodo={handleSaveTodo}
                handleDeleteTodo={handleDeleteTodo}
                handlePinTodo={handlePinTodo}
            />
        </div>
    );
}

export default App;
