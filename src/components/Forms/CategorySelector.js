import React from "react";
import styles from "./categorySelector.module.css";

const CategorySelector = ({ value, handleCategoryChange, todoCategories }) => {
    return (
        <>
            <select
                value={value}
                onChange={handleCategoryChange}
                id={styles.todoCategories}
                data-placeholder="Select a Category"
            >
                {todoCategories.map((todoCategory) => {
                    return (
                        <option value={todoCategory} key={todoCategory}>
                            {todoCategory}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

export default CategorySelector;
