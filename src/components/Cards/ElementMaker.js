import React from "react";
import styles from "./elementMaker.module.css";

function ElementMaker(props) {
    return (
        <span className={styles.inputSpan}>
            {props.showInputEle && !props.isChecked ? (
                <textarea
                    type="text"
                    value={props.value}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    onKeyDown={props.handleInputSpanEnter}
                    autoFocus
                    rows={5}
                />
            ) : (
                <span onDoubleClick={props.handleDoubleClick}>{props.value} </span>
            )}
        </span>
    );
}

export default ElementMaker;
