import React, { useRef, useState } from "react";
import CategorySelector from "./CategorySelector";
import styles from "./addTodoForm.module.css";

const AddTodoForm = ({ todoCategories, addNewTodo }) => {
    const todoInput = useRef(null);
    const [selectedTodoCategory, setSelectedTodoCategory] = useState("Work");

    const handleCategoryChange = (event) => {
        setSelectedTodoCategory(event.target.value);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        addNewTodo(todoInput.current.value, selectedTodoCategory);
        todoInput.current.value = "";
    };

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

export default AddTodoForm;
