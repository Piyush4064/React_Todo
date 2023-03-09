import React from "react";
import PropTypes from "prop-types";

import styles from "./todoText.module.css";

function TodoText({
    value,
    showInputEle,
    isChecked,
    handleTodoChange,
    handleBlur,
    handleSaveTodo,
    handleDoubleClick,
}) {
    return (
        <span className={styles.inputSpan}>
            {showInputEle && !isChecked ? (
                <textarea
                    type="text"
                    value={value}
                    onChange={handleTodoChange}
                    onBlur={handleBlur}
                    onKeyDown={handleSaveTodo}
                    autoFocus
                    rows={5}
                />
            ) : (
                <span onDoubleClick={handleDoubleClick}>{value} </span>
            )}
        </span>
    );
}

TodoText.propTypes = {
    value: PropTypes.string,
    showInputEle: PropTypes.bool,
    isChecked: PropTypes.bool,
    handleTodoChange: PropTypes.func,
    handleBlur: PropTypes.func,
    handleSaveTodo: PropTypes.func,
    handleDoubleClick: PropTypes.func,
};

TodoText.defaultProps = {
    value: "",
    showInputEle: false,
    isChecked: false,
    handleTodoChange: () => null,
    handleBlur: () => null,
    handleSaveTodo: () => null,
    handleDoubleClick: () => null,
};

export default React.memo(TodoText);
