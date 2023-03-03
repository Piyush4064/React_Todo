import React, { useRef } from "react";
import styles from "./addCategoryForm.module.css";

const AddCategoryForm = ({ addNewCategory }) => {
    const categoryInput = useRef(null);

    const handleAddCategory = (event) => {
        event.preventDefault();
        addNewCategory(categoryInput.current.value);
        categoryInput.current.value = "";
    };

    return (
        <form onSubmit={handleAddCategory}>
            <input
                ref={categoryInput}
                type="text"
                placeholder="Add a new category."
                id={styles.inputForTodoCategory}
            />

            <button className={styles.addTodoCategory} type="submit">
                Add
            </button>
        </form>
    );
};

export default AddCategoryForm;
