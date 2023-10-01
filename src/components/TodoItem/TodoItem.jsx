import React from "react";
import "./TodoItem.css";

const TodoItem = (prop) => {
    const textClassName = prop.itemChecked ? "todoText completed" : "todoText";

    return (
        <>
            <div className="todoAppItem">
                {/* {prop.itemId} {prop.itemText} {JSON.stringify(prop.itemChecked)} */}
                <div className="leftTodoAppItemSection">
                    <input
                        type="checkbox"
                        className="todoCheckbox"
                        id={`item_${prop.itemId}`}
                        checked={prop.itemChecked}
                        onChange={() => {
                            prop.updateHandler(prop.itemId, !prop.itemChecked);
                        }}
                    />
                    <label
                        htmlFor={`item_${prop.itemId}`}
                        className={textClassName}
                    >
                        {prop.itemText}
                    </label>
                </div>
                {prop.deleteHandler ? (
                    <>
                        <div className="rightTodoAppItemSection">
                            <div className="todoAppItemDelete">
                                <i
                                    className="ri-delete-bin-line"
                                    onClick={() => {
                                        prop.deleteHandler(prop.itemId);
                                    }}
                                ></i>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default TodoItem;
