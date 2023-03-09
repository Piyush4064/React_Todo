import React, { useRef, useCallback } from "react";
import PropTypes from "prop-types";

import styles from "./addCategory.module.css";

const AddCategory = ({ addNewCategory }) => {
    const categoryInput = useRef(null);

    const handleAddCategory = useCallback(
        (event) => {
            event.preventDefault();
            addNewCategory(categoryInput.current.value);
            categoryInput.current.value = "";
        },
        [addNewCategory]
    );

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

AddCategory.propTypes = {
    addNewCategory: PropTypes.func,
};

AddCategory.defaultProps = {
    addNewCategory: () => null,
}

export default React.memo(AddCategory);
