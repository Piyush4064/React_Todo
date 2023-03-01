import React, { useState } from "react";
import ElementMaker from "./ElementMaker";
import styles from "./CardForTodo.module.css";

const CardForTodo = (props) => {
    const [todoText, setTodoText] = useState(props.todo);
    const [showInputEle, setShowInputEle] = useState(false);

    const handleCheckBoxClick = () => {
        props.handleCheckBoxClick(props.id, props.category);
    };

    const handleDeleteButtonClick = () => {
        props.handleDeleteButtonClick(props.id, props.category);
    };
    const handlePinButtonClick = () => {
        props.handlePinButtonClick(props.id, props.category);
    };

    const handleInputSpanEnter = (event) => {
        if (event.key === "Enter") {
            props.handleInputSpanEnter(props.id, props.category, todoText);
            setShowInputEle(false);
        }
    };

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
                onClick={handleCheckBoxClick}
                defaultChecked={props.isChecked}
            />
            <ElementMaker
                value={todoText}
                handleChange={(e) => setTodoText(e.target.value)}
                handleDoubleClick={() => setShowInputEle(true)}
                handleBlur={() => setShowInputEle(false)}
                handleInputSpanEnter={handleInputSpanEnter}
                showInputEle={showInputEle}
                isChecked={props.isChecked}
            />
            <button className={styles.delete} onClick={handleDeleteButtonClick}>
                <i className="fa-solid fa-trash"></i>
            </button>
            <button
                className={`${styles.pinStyle} ${
                    props.isPin ? styles.pinButtonToggle : ""
                }`}
                onClick={handlePinButtonClick}
            >
                <i className="fa-solid fa-thumbtack"></i>
            </button>
        </div>
    );
};

export default CardForTodo;
