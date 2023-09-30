import React from "react";
import TodoBody from "../components/TodoBody/TodoBody";
import TodoHeader from "../components/TodoHeader/TodoHeader";
import "./todo.css";

const TodoApp = () => {
    return (
        <>
            <div className="todoContainer">
                <div className="todoWrapper">
                    <div className="todoHeader">#todo</div>
                    <div className="todoApp">
                        <TodoHeader />
                        <TodoBody />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoApp;
