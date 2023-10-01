import React from "react";
import { makeApiCall } from "../../utils/utility";
import "./TodoHeader.css";

const TodoHeader = (prop) => {
    const getNewClassNameObject = (all, active, completed, selected) => {
        return { all, active, completed, selected };
    };

    const handleClick = (newSelectedMenu) => {
        makeApiCall({
            event: "Menu Changed",
            metadata: {
                newState: newSelectedMenu,
                oldState: prop.selectedTabStatus,
            },
        });
        let updatedClassName = { ...prop.selectedTabStatus };

        if (newSelectedMenu === "all") {
            updatedClassName = getNewClassNameObject(
                "todoAppHeadingItem todoAppHeadingItemSelected",
                "todoAppHeadingItem",
                "todoAppHeadingItem",
                "all"
            );
        } else if (newSelectedMenu === "active") {
            updatedClassName = getNewClassNameObject(
                "todoAppHeadingItem",
                "todoAppHeadingItem todoAppHeadingItemSelected",
                "todoAppHeadingItem",
                "active"
            );
        } else if (newSelectedMenu === "completed") {
            updatedClassName = getNewClassNameObject(
                "todoAppHeadingItem",
                "todoAppHeadingItem",
                "todoAppHeadingItem todoAppHeadingItemSelected",
                "completed"
            );
        }

        prop.setSelectedTabStatus(updatedClassName);
        prop.setSelected(updatedClassName.selected);
    };

    return (
        <>
            {prop.selectedTile}
            <div className="todoAppHeadings">
                <div
                    className={prop.selectedTabStatus?.all}
                    onClick={() => handleClick("all")}
                >
                    All
                </div>
                <div
                    className={prop.selectedTabStatus?.active}
                    onClick={() => handleClick("active")}
                >
                    Active
                </div>
                <div
                    className={prop.selectedTabStatus?.completed}
                    onClick={() => handleClick("completed")}
                >
                    Completed
                </div>
            </div>
        </>
    );
};

export default TodoHeader;
