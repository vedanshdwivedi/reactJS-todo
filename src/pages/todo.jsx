import React from "react";
import TodoBody from "../components/TodoBody/TodoBody";
import "./todo.css";

const TodoApp = () => {
    // useEffect(makeApiCall({ event: "pageLoad", metadata: {}}), []);

    return (
        <>
            <div className="todoContainer">
                <div className="todoWrapper">
                    <div className="todoHeader">#todo</div>
                    <TodoBody />
                </div>
            </div>
        </>
    );
};

export default TodoApp;
