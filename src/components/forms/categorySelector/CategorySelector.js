import React from "react";
import PropTypes from "prop-types";

import styles from "./categorySelector.module.css";

const CategorySelector = ({ value, handleCategoryChange, todoCategories }) => {
    return (
        <select value={value} onChange={handleCategoryChange} id={styles.todoCategories}>
            {todoCategories.map((todoCategory) => {
                return (
                    <option value={todoCategory} key={todoCategory}>
                        {todoCategory}
                    </option>
                );
            })}
        </select>
    );
};

CategorySelector.propTypes = {
    value: PropTypes.string,
    handleCategoryChange: PropTypes.func,
    todoCategories: PropTypes.array,
};

CategorySelector.defaultProps = {
    value: "",
    handleCategoryChange: () => null,
    todoCategories: [],
};

export default React.memo(CategorySelector);
