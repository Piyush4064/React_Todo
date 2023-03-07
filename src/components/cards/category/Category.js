import React from "react";
import Todo from "../todo";
import styles from "./category.module.css";
import { addNewTodo, completeTodo, deleteTodo, pinTodo } from "./helperFunction";
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
    function handleOnDrop(event) {
        const receivedTodo = JSON.parse(event.dataTransfer.getData("transferTodo"));
        if (receivedTodo.category === category) {
            return;
        }
        let clonedTodoItems = deleteTodo(
            receivedTodo.id,
            receivedTodo.category,
            todoItems
        );
        clonedTodoItems = addNewTodo(receivedTodo.task, category, clonedTodoItems);
        receivedTodo.isChecked &&
            (clonedTodoItems = completeTodo(
                clonedTodoItems[category].at(-1).id,
                category,
                clonedTodoItems
            ));
        receivedTodo.isPin &&
            (clonedTodoItems = pinTodo(
                clonedTodoItems[category].at(-1).id,
                category,
                clonedTodoItems
            ));

        updateTodoItems(clonedTodoItems);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

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

export default React.memo(Category);
