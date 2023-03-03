import React from "react";
import TodoCard from "./TodoCard";
import styles from "./categoryCard.module.css";

const CategoryCard = ({
    todos,
    category,
    handleCheckBoxClick,
    handleInputSpanEnter,
    handleDeleteButtonClick,
    handlePinButtonClick,
}) => {
    return (
        <div className={styles.card}>
            <h3>{category}</h3>
            {todos.map((todo) => {
                return (
                    <TodoCard
                        todo={todo.task}
                        key={todo.id}
                        id={todo.id}
                        category={category}
                        isPin={todo.isPin}
                        isChecked={todo.isChecked}
                        handleCheckBoxClick={handleCheckBoxClick}
                        handleInputSpanEnter={handleInputSpanEnter}
                        handleDeleteButtonClick={handleDeleteButtonClick}
                        handlePinButtonClick={handlePinButtonClick}
                    />
                );
            })}
        </div>
    );
};

export default CategoryCard;
