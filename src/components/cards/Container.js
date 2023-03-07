import React from "react";
import Category from "./category";
import styles from "./container.module.css";

const Container = ({
    todoItems,
    updateTodoItems,
    handleCompleteTodo,
    handleSaveTodo,
    handleDeleteTodo,
    handlePinTodo,
}) => {
    const keys = Object.keys(todoItems);
    return (
        <div className={styles.cardsForAllCategories}>
            {keys.map((key) => {
                return (
                    <Category
                        todos={todoItems[key]}
                        todoItems={todoItems}
                        updateTodoItems={updateTodoItems}
                        category={key}
                        key={key}
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

export default React.memo(Container);
