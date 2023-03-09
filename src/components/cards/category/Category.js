import React, { useCallback } from "react";
import PropTypes from "prop-types";

import { changeTodoCategory } from "./helper.dragAndDropTodo";
import Todo from "../todo";

import styles from "./category.module.css";

const Category = ({
    todos,
    todoItems,
    updateTodoItems,
    category,
    handleCompleteTodo,
    handleSaveTodo,
    handleDeleteTodo,
    handlePinTodo,
}) => {
    const handleOnDrop = useCallback(
        (event) => {
            const receivedTodo = JSON.parse(event.dataTransfer.getData("transferTodo"));
            if (receivedTodo.category === category) {
                return;
            }
            changeTodoCategory(receivedTodo, todoItems, category, updateTodoItems);
        },
        [category, todoItems, updateTodoItems]
    );

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
    }, []);

    return (
        <div className={styles.card} onDrop={handleOnDrop} onDragOver={handleDragOver}>
            <h3>{category}</h3>
            {todos.map((todo) => {
                return (
                    <Todo
                        task={todo.task}
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

Category.propTypes = {
    todos: PropTypes.array,
    todoItems: PropTypes.object,
    updateTodoItems: PropTypes.func,
    category: PropTypes.string,
    handleCompleteTodo: PropTypes.func,
    handleSaveTodo: PropTypes.func,
    handleDeleteTodo: PropTypes.func,
    handlePinTodo: PropTypes.func,
};

Category.defaultProps = {
    todos: [],
    todoItems: {},
    category: "",
    updateTodoItems: () => null,
    handleCompleteTodo: () => null,
    handleSaveTodo: () => null,
    handleDeleteTodo: () => null,
    handlePinTodo: () => null,
};

export default React.memo(Category);
