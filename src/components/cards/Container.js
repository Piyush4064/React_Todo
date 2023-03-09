import React from "react";
import PropTypes from "prop-types";

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

Container.propTypes = {
    todoItems: PropTypes.object,
    updateTodoItems: PropTypes.func,
    handleCompleteTodo: PropTypes.func,
    handleSaveTodo: PropTypes.func,
    handleDeleteTodo: PropTypes.func,
    handlePinTodo: PropTypes.func,
};

Container.defaultProps = {
    todoItems: {},
    updateTodoItems: () => null,
    handleCompleteTodo: () => null,
    handleSaveTodo: () => null,
    handleDeleteTodo: () => null,
    handlePinTodo: () => null,
};

export default React.memo(Container);
