import React from "react";
import "./TodoHeader.css";

const TodoHeader = () => {
    return (
        <>
            <div className="todoAppHeadings">
                <div className="todoAppHeadingItem todoAppHeadingItemSelected">
                    All
                </div>
                <div className="todoAppHeadingItem">Active</div>
                <div className="todoAppHeadingItem">Completed</div>
            </div>
        </>
    );
};

export default TodoHeader;
