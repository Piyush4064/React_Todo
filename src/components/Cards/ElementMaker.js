import React from "react";
import styles from "./ElementMaker.module.css";

function ElementMaker(props) {
    return (
        <span className={styles.inputSpan}>
            {props.showInputEle && !props.isChecked ? (
                <input
                    type="text"
                    value={props.value}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    onKeyDown={props.handleInputSpanEnter}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={props.handleDoubleClick}>{props.value} </span>
            )}
        </span>
    );
}

export default ElementMaker;
