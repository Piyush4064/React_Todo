import { addNewTodo, completeTodo, deleteTodo, pinTodo } from "../../../helper.todo";

export function changeTodoCategory(
    receivedTodo,
    todoItems,
    newCategory,
    updateTodoItems
) {
    let clonedTodoItems = deleteTodo(receivedTodo.id, receivedTodo.category, todoItems);
    clonedTodoItems = addNewTodo(receivedTodo.task, newCategory, clonedTodoItems);

    if (receivedTodo.isChecked) {
        clonedTodoItems = completeTodo(
            clonedTodoItems[newCategory].at(-1).id,
            newCategory,
            clonedTodoItems
        );
    }

    if (receivedTodo.isPin) {
        clonedTodoItems = pinTodo(
            clonedTodoItems[newCategory].at(-1).id,
            newCategory,
            clonedTodoItems
        );
    }
    updateTodoItems(clonedTodoItems);
}
