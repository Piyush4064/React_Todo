import React, { useRef, useState } from "react";
import CategorySelect from "./CategorySelect";
import styles from "./AddTodoForm.module.css";

const AddTodoForm = (props) => {
    const todoInput = useRef(null);
    const [selectedTodoCategory, setSelectedTodoCategory] = useState("Work");

    const handleCategoryChange = (event) => {
        setSelectedTodoCategory(event.target.value);
    };

    const handleAddTodo = (event) => {
        event.preventDefault();
        props.addNewTodo(todoInput.current.value, selectedTodoCategory);
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
                <CategorySelect
                    value={selectedTodoCategory}
                    todoCategories={props.todoCategories}
                    handleCategoryChange={handleCategoryChange}
                />
            </div>
        </form>
    );
};

export default AddTodoForm;
