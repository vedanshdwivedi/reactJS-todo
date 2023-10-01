import React, { useState } from "react";
import './TodoForm.css';

const TodoForm = ({ formHandler }) => {
    const [taskText, setTaskText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim() !== "") {
            formHandler(taskText);
            setTaskText("")
        }
    };

    return (
        <>
            <div className="todoAppForm">
                <form className="todoAppFormTag" onSubmit={handleSubmit}>
                    <div className="todoFormElements">
                        <div className="todoFormElement">
                            <input
                                type="text"
                                value={taskText}
                                placeholder="add details"
                                className="formInput"
                                onChange={(e) => setTaskText(e.target.value)}
                                required
                            />
                        </div>
                        <div className="todoFormElement">
                            <input
                                type="submit"
                                value="Add"
                                className="formBtn"
                                id="formBtn"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default TodoForm;
