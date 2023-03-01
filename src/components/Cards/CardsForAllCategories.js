import React from "react";
import CardForCategory from "./CardForCategory";
import styles from "./CardsForAllCategories.module.css";

const CardsForAllCategories = (props) => {
    return (
        <div className={styles.cardsForAllCategories}>
            {props.todos.map((todos) => {
                return (
                    <CardForCategory
                        todos={todos.todosArray}
                        category={todos.category}
                        key={todos.id}
                        handleCheckBoxClick={props.handleCheckBoxClick}
                        handleInputSpanEnter={props.handleInputSpanEnter}
                        handleDeleteButtonClick={props.handleDeleteButtonClick}
                        handlePinButtonClick={props.handlePinButtonClick}
                    />
                );
            })}
        </div>
    );
};

export default CardsForAllCategories;
