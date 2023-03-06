import React, { useState, useCallback } from "react";
import TodoText from "../todoText";
import styles from "./todo.module.css";
import { EVENT_KEYS } from "./constant";

const Todo = (props) => {
    const [todoText, setTodoText] = useState(props.todo);
    const [showInputEle, setShowInputEle] = useState(false);

    const completeTodo = useCallback(() => {
        props.handleCompleteTodo(props.id, props.category);
    }, [props]);

    const deleteTodo = useCallback(() => {
        props.handleDeleteTodo(props.id, props.category);
    }, [props]);

    const pinTodo = useCallback(() => {
        props.handlePinTodo(props.id, props.category);
    }, [props]);

    const saveTodo = useCallback(
        (event) => {
            if (event.key === EVENT_KEYS.ENTER) {
                props.handleSaveTodo(props.id, props.category, todoText);
                setShowInputEle(false);
            }
        },
        [props, todoText]
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
    return (
        <div
            className={`forInsert ${styles.todoCard} ${
                props.isChecked ? styles.completed : ""
            }`}
            id="todoCategory"
        >
            <input
                type="checkbox"
                className={styles.checkBox}
                onClick={completeTodo}
                defaultChecked={props.isChecked}
            />
            <TodoText
                value={todoText}
                handleTodoChange={handleTodoChange}
                handleDoubleClick={handleDoubleClick}
                handleBlur={handleBlur}
                handleSaveTodo={saveTodo}
                showInputEle={showInputEle}
                isChecked={props.isChecked}
            />
            <button className={styles.delete} onClick={deleteTodo}>
                <i className="fa-solid fa-trash"></i>
            </button>
            <button
                className={`${styles.pinStyle} ${
                    props.isPin ? styles.pinButtonToggle : ""
                }`}
                onClick={pinTodo}
            >
                <i className="fa-solid fa-thumbtack"></i>
            </button>
        </div>
    );
};

export default React.memo(Todo);
