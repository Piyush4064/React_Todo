import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { EVENT_KEYS } from "./constant";
import TodoText from "../todoText";

import styles from "./todo.module.css";

const Todo = ({
    task,
    id,
    category,
    isPin,
    isChecked,
    handleCompleteTodo,
    handleSaveTodo,
    handleDeleteTodo,
    handlePinTodo,
}) => {
    const [todoText, setTodoText] = useState(task);
    const [showInputEle, setShowInputEle] = useState(false);

    const completeTodo = useCallback(() => {
        handleCompleteTodo(id, category);
    }, [category, handleCompleteTodo, id]);

    const deleteTodo = useCallback(() => {
        handleDeleteTodo(id, category);
    }, [category, handleDeleteTodo, id]);

    const pinTodo = useCallback(() => {
        handlePinTodo(id, category);
    }, [category, handlePinTodo, id]);

    const saveTodo = useCallback(
        (event) => {
            if (event.key === EVENT_KEYS.ENTER) {
                handleSaveTodo(id, category, todoText);
                setShowInputEle(false);
            }
        },
        [category, handleSaveTodo, id, todoText]
    );

    const handleTodoChange = useCallback((event) => {
        setTodoText(event.target.value);
    }, []);

    const handleDoubleClick = useCallback(() => {
        setShowInputEle(true);
    }, []);

    const handleBlur = useCallback(() => {
        setShowInputEle(false);
    }, []);

    const handleOnDrag = useCallback(
        (event) => {
            const transferTodo = {
                id: id,
                category: category,
                task: task,
                isPin: isPin,
                isChecked: isChecked,
            };
            event.dataTransfer.setData("transferTodo", JSON.stringify(transferTodo));
        },
        [category, id, isChecked, isPin, task]
    );

    return (
        <div
            className={`forInsert ${styles.todoCard} ${
                isChecked ? styles.completed : ""
            }`}
            id="todoCategory"
            draggable
            onDragStart={handleOnDrag}
        >
            <input
                type="checkbox"
                className={styles.checkBox}
                onClick={completeTodo}
                defaultChecked={isChecked}
            />
            <TodoText
                value={todoText}
                handleTodoChange={handleTodoChange}
                handleDoubleClick={handleDoubleClick}
                handleBlur={handleBlur}
                handleSaveTodo={saveTodo}
                showInputEle={showInputEle}
                isChecked={isChecked}
            />
            <button className={styles.delete} onClick={deleteTodo}>
                <i className="fa-solid fa-trash"></i>
            </button>
            <button
                className={`${styles.pinStyle} ${isPin ? styles.pinButtonToggle : ""}`}
                onClick={pinTodo}
            >
                <i className="fa-solid fa-thumbtack"></i>
            </button>
        </div>
    );
};

Todo.propTypes = {
    task: PropTypes.string,
    id: PropTypes.number,
    category: PropTypes.string,
    isPin: PropTypes.bool,
    isChecked: PropTypes.bool,
    handleCompleteTodo: PropTypes.func,
    handleSaveTodo: PropTypes.func,
    handleDeleteTodo: PropTypes.func,
    handlePinTodo: PropTypes.func,
};

Todo.defaultProps = {
    task: "",
    id: new Date().valueOf(),
    category: "",
    isPin: false,
    isChecked: false,
    handleCompleteTodo: () => null,
    handleSaveTodo: () => null,
    handleDeleteTodo: () => null,
    handlePinTodo: () => null,
};

export default React.memo(Todo);
