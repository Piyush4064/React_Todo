import React from "react";
import Todo from "../todo";
import styles from "./category.module.css";

const Category = ({
    todos,
    category,
    handleCompleteTodo,
    handleSaveTodo,
    handleDeleteTodo,
    handlePinTodo,
}) => {
    return (
        <div className={styles.card}>
            <h3>{category}</h3>
            {todos.map((todo) => {
                return (
                    <Todo
                        todo={todo.task}
                        key={todo.id}
                        id={todo.id}
                        category={category}
                        isPin={todo.isPin}
                        isChecked={todo.isChecked}
                        handleCompleteTodo={handleCompleteTodo}
                        handleSaveTodo={handleSaveTodo}
                        handleDeleteTodo={handleDeleteTodo}
                        handlePinTodo={handlePinTodo}
                    />
                );
            })}
        </div>
    );
};

export default React.memo(Category);
