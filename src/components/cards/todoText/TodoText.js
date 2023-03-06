import React from "react";
import styles from "./todoText.module.css";

function TodoText(props) {
    return (
        <span className={styles.inputSpan}>
            {props.showInputEle && !props.isChecked ? (
                <textarea
                    type="text"
                    value={props.value}
                    onChange={props.handleTodoChange}
                    onBlur={props.handleBlur}
                    onKeyDown={props.handleSaveTodo}
                    autoFocus
                    rows={5}
                />
            ) : (
                <span onDoubleClick={props.handleDoubleClick}>{props.value} </span>
            )}
        </span>
    );
}

export default React.memo(TodoText);
