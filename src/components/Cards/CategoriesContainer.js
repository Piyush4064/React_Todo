import React from "react";
import CategoryCard from "./CategoryCard";
import styles from "./categoriesContainer.module.css";

const CategoriesContainer = ({
    todoItems,
    handleCheckBoxClick,
    handleInputSpanEnter,
    handleDeleteButtonClick,
    handlePinButtonClick,
}) => {
    const keys = Object.keys(todoItems);
    return (
        <div className={styles.cardsForAllCategories}>
            {keys.map((key) => {
                return (
                    <CategoryCard
                        todos={todoItems[key]}
                        category={key}
                        key={key}
                        handleCheckBoxClick={handleCheckBoxClick}
                        handleInputSpanEnter={handleInputSpanEnter}
                        handleDeleteButtonClick={handleDeleteButtonClick}
                        handlePinButtonClick={handlePinButtonClick}
                    />
                );
            })}
        </div>
    );
};

export default CategoriesContainer;
