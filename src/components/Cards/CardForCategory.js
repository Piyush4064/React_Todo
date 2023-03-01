import React from "react";
import CardForTodo from "./CardForTodo";
import styles from "./CardForCategory.module.css";

const CardForCategory = (props) => {
    return (
        <div className={styles.card}>
            <h3>{props.category}</h3>
            {props.todos.map((todo) => {
                return (
                    <CardForTodo
                        todo={todo.task}
                        key={todo.id}
                        id={todo.id}
                        category={props.category}
                        isPin={todo.isPin}
                        isChecked={todo.isChecked}
                        handleCheckBoxClick={props.handleCheckBoxClick}
                        handleInputSpanEnter={props.handleInputSpanEnter}
                        handleDeleteButtonClick={props.handleDeleteButtonClick}
                        handlePinButtonClick={props.handlePinButtonClick}
                    />
                );
            })}
        </div>
    );
};

export default CardForCategory;
