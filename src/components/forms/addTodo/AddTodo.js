import React, { useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";

import CategorySelector from "../categorySelector";

import styles from "./addTodo.module.css";

const AddTodo = ({ todoCategories, addNewTodo }) => {
    const todoInput = useRef(null);
    const [selectedTodoCategory, setSelectedTodoCategory] = useState("Work");

    const handleCategoryChange = useCallback((event) => {
        setSelectedTodoCategory(event.target.value);
    }, []);

    const handleAddTodo = useCallback(
        (event) => {
            event.preventDefault();
            addNewTodo(todoInput.current.value, selectedTodoCategory);
            todoInput.current.value = "";
        },
        [addNewTodo, selectedTodoCategory]
    );

    return (
        <form onSubmit={handleAddTodo}>
            <input
                ref={todoInput}
                type="text"
                placeholder="New Todo"
                className={styles.inputForTodo}
            />
            <button id={styles.addTodo} type="submit">
                Add
            </button>
            <div className="dropDownMenu">
                <label>Choose a category:</label>
                <CategorySelector
                    value={selectedTodoCategory}
                    todoCategories={todoCategories}
                    handleCategoryChange={handleCategoryChange}
                />
            </div>
        </form>
    );
};

AddTodo.propTypes = {
    todoCategories: PropTypes.array,
    addNewTodo: PropTypes.func,
    addNewCategory: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
};

export default React.memo(AddTodo);
