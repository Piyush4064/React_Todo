import React from "react";
import AddTodo from "./addTodo";
import AddCategory from "./addCategory";

const Header = ({ todoCategories, addNewTodo, addNewCategory }) => {
    return (
        <div className="header">
            <h1>Todo App</h1>
            <AddTodo todoCategories={todoCategories} addNewTodo={addNewTodo} />
            <AddCategory addNewCategory={addNewCategory} />
        </div>
    );
};

export default React.memo(Header);
