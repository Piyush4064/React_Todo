import React, { useState } from "react";
import Header from "./components/Header";
import CardsForAllCategories from "./components/Cards/CardsForAllCategories";

import "./App.css";

const LOCAL_STORAGE_TODOS_KEY = "LOCAL_STORAGE_TODOS_KEY";
const dummyTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY)) || [];

const LOCAL_STORAGE_TODO_CATEGORIES_KEY = "LOCAL_STORAGE_TODO_CATEGORIES_KEY";
const dummyTodoCategories = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_TODO_CATEGORIES_KEY)
) || [{ id: 1, value: "Work" }];

function saveTodos(todos) {
    localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todos));
}

function saveTodoCategories(todoCategories) {
    localStorage.setItem(
        LOCAL_STORAGE_TODO_CATEGORIES_KEY,
        JSON.stringify(todoCategories)
    );
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function App() {
    const [todos, setTodos] = useState(dummyTodos);
    const [todoCategories, setTodoCategories] = useState(dummyTodoCategories);

    const findIndexOfCategoryAndTodo = (id, category) => {
        for (let indexOfCategory = 0; indexOfCategory < todos.length; indexOfCategory++) {
            if (todos[indexOfCategory].category === category) {
                for (
                    let indexOfTodo = 0;
                    indexOfTodo < todos[indexOfCategory].todosArray.length;
                    indexOfTodo++
                ) {
                    if (todos[indexOfCategory].todosArray[indexOfTodo].id === id) {
                        return [indexOfCategory, indexOfTodo];
                    }
                }
            }
        }
        return [-1, -1];
    };

    const addNewCategory = (newCategory) => {
        if (newCategory.trim() === "") {
            return;
        }
        newCategory = capitalizeFirstLetter(newCategory);
        for (let index = 0; index < todoCategories.length; index++) {
            if (todoCategories[index].value === newCategory) {
                return;
            }
        }
        const cate = { id: new Date().valueOf(), value: newCategory };
        const tmpArr = [...todoCategories, cate];
        saveTodoCategories(tmpArr);
        setTodoCategories(tmpArr);
    };

    const addNewTodo = (todo, category) => {
        if (todo.trim() === "") {
            return;
        }
        const tmpTodos = [...todos];
        let targetIndex = -1;

        for (let index = 0; index < tmpTodos.length; index++) {
            if (tmpTodos[index].category === category) {
                targetIndex = index;
            }
        }
        const newTodo = {
            id: new Date().valueOf(),
            task: todo,
            isChecked: false,
            isPin: false,
        };

        if (targetIndex !== -1) {
            tmpTodos[targetIndex].todosArray.push(newTodo);
        } else {
            const uniqueId = new Date().valueOf();
            const newItem = {
                id: uniqueId,
                category: category,
                todosArray: [],
            };
            newItem.todosArray.push(newTodo);
            tmpTodos.push(newItem);
        }
        saveTodos(tmpTodos);
        setTodos(tmpTodos);
    };

    const handleCheckBoxClick = (id, category) => {
        const tmpTodos = [...todos];

        const [indexOfCategory, indexOfTodo] = findIndexOfCategoryAndTodo(id, category);

        if (indexOfCategory !== -1) {
            tmpTodos[indexOfCategory].todosArray[indexOfTodo].isChecked =
                !tmpTodos[indexOfCategory].todosArray[indexOfTodo].isChecked;
            saveTodos(tmpTodos);
            setTodos(tmpTodos);
        }
    };

    const handleInputSpanEnter = (id, category, content) => {
        if (content.trim() === "") {
            handleDeleteButtonClick(id, category);
            return;
        }
        const tmpTodos = [...todos];
        const [indexOfCategory, indexOfTodo] = findIndexOfCategoryAndTodo(id, category);

        if (indexOfCategory !== -1) {
            tmpTodos[indexOfCategory].todosArray[indexOfTodo].task = content;
            saveTodos(tmpTodos);
            setTodos(tmpTodos);
        }
    };
    const handleDeleteButtonClick = (id, category) => {
        const tmpTodos = [...todos];
        const [indexOfCategory, indexOfTodo] = findIndexOfCategoryAndTodo(id, category);

        if (indexOfCategory !== -1) {
            tmpTodos[indexOfCategory].todosArray.splice(indexOfTodo, 1);
            if (tmpTodos[indexOfCategory].todosArray.length === 0) {
                tmpTodos.splice(indexOfCategory, 1);
            }
            saveTodos(tmpTodos);
            setTodos(tmpTodos);
        }
    };
    const handlePinButtonClick = (id, category) => {
        const tmpTodos = [...todos];
        const [indexOfCategory, indexOfTodo] = findIndexOfCategoryAndTodo(id, category);

        if (indexOfCategory !== -1) {
            const entry = tmpTodos[indexOfCategory].todosArray[indexOfTodo];
            tmpTodos[indexOfCategory].todosArray.splice(indexOfTodo, 1);
            entry.isPin = !entry.isPin;
            entry.id = new Date().valueOf();

            entry.isPin
                ? tmpTodos[indexOfCategory].todosArray.unshift(entry)
                : tmpTodos[indexOfCategory].todosArray.push(entry);

            saveTodos(tmpTodos);
            setTodos(tmpTodos);
        }
    };

    return (
        <div className="App">
            <Header
                todoCategories={todoCategories}
                addNewCategory={addNewCategory}
                addNewTodo={addNewTodo}
            />
            <CardsForAllCategories
                todos={todos}
                handleCheckBoxClick={handleCheckBoxClick}
                handleInputSpanEnter={handleInputSpanEnter}
                handleDeleteButtonClick={handleDeleteButtonClick}
                handlePinButtonClick={handlePinButtonClick}
            />
        </div>
    );
}

export default App;
