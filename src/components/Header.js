import React from "react";
import AddTodoForm from "./Forms/AddTodoForm";
import AddCategoryForm from "./Forms/AddCategoryForm";

const Header = (props) => {
    return (
        <div className="header">
            <h1>Todo App</h1>
            <AddTodoForm
                todoCategories={props.todoCategories}
                addNewTodo={props.addNewTodo}
            />
            <AddCategoryForm addNewCategory={props.addNewCategory} />
        </div>
    );
};

export default Header;
