import React from "react";
import PropTypes from "prop-types";

import AddCategory from "./addCategory";
import AddTodo from "./addTodo";

import styles from "./header.module.css";

const Header = ({ todoCategories, addNewTodo, addNewCategory }) => {
    return (
        <div className={styles.header}>
            <h1>Todo App</h1>
            <AddTodo todoCategories={todoCategories} addNewTodo={addNewTodo} />
            <AddCategory addNewCategory={addNewCategory} />
        </div>
    );
};

Header.propTypes = {
    todoCategories: PropTypes.array,
    addNewTodo: PropTypes.func,
    addNewCategory: PropTypes.func,
};

export default React.memo(Header);
