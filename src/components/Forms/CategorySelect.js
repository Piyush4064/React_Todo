import React from "react";
import styles from "./CategorySelect.module.css";

const CategorySelect = (props) => {
    return (
        <>
            <select
                value={props.value}
                onChange={props.handleCategoryChange}
                id={styles.todoCategories}
                data-placeholder="Select a Category"
            >
                {props.todoCategories.map((todoCategory) => {
                    return (
                        <option value={todoCategory.value} key={todoCategory.id}>
                            {todoCategory.value}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

export default CategorySelect;
