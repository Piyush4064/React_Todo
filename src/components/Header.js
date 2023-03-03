import React from "react";
import AddTodoForm from "./forms/AddTodoForm";
import AddCategoryForm from "./forms/AddCategoryForm";

const Header = ({ todoCategories, addNewTodo, addNewCategory }) => {
    return (
        <div className="header">
            <h1>Todo App</h1>
            <AddTodoForm todoCategories={todoCategories} addNewTodo={addNewTodo} />
            <AddCategoryForm addNewCategory={addNewCategory} />
        </div>
    );
};

export default Header;
