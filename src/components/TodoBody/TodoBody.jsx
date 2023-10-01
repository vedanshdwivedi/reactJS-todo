import React, { useEffect, useState } from "react";
import { makeApiCall } from "../../utils/utility";
import TodoForm from "../TodoForm/TodoForm";
import TodoHeader from "../TodoHeader/TodoHeader";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoBody.css";

const TodoBody = () => {
    const [taskCounter, setTaskCounter] = useState(0);
    const [todoList, setTodoList] = useState([]);
    const [selectedTab, setSelectedTab] = useState("all");
    const [selectedTabStatus, setSelectedTabStatus] = useState({
        all: "todoAppHeadingItem todoAppHeadingItemSelected",
        active: "todoAppHeadingItem",
        completed: "todoAppHeadingItem",
        selected: "all",
    });

    useEffect(() => {
        const storedTodoList = localStorage.getItem("todoList");
        if (storedTodoList) {
            setTodoList(JSON.parse(storedTodoList));
        }
    }, []);

    const addTask = (text) => {
        const newTodo = {
            text,
            checked: false,
            id: taskCounter,
        };
        setTaskCounter(taskCounter + 1);
        setTodoList([...todoList, newTodo]);

        localStorage.setItem("todoList", JSON.stringify(todoList));
    };

    const updateTaskStatus = (taskId, checked) => {
        
        const updatedTodoList = [...todoList];
        const taskIndex = updatedTodoList.findIndex(
            (item) => item.id === taskId
        );

        if (taskIndex !== -1) {
            makeApiCall({event: 'Task Checkbox Updated', metadata: {oldTask: updatedTodoList[taskIndex]}});
            updatedTodoList[taskIndex].checked = checked;
            setTodoList(updatedTodoList);

            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    };

    const deleteTask = (taskId) => {
        const updatedTodoList = [...todoList];
        const filteredTodoList = updatedTodoList.filter(
            (item) => item.id !== taskId
        );
        setTodoList(filteredTodoList);

        localStorage.setItem("todoList", JSON.stringify(todoList));
    };

    const updateSelectedTab = (newTab) => {
        setSelectedTab(newTab);
    };

    const getTodoItemPopulated = (itemId, itemText, checkBox) => {
        return (
            <TodoItem
                itemId={itemId}
                itemText={itemText}
                itemChecked={checkBox}
                deleteHandler={deleteTask}
                updateHandler={updateTaskStatus}
                key={itemId}
            />
        );
    };

    const itemSelector = (itemId, itemText, checkBox, selectedPage) => {
        if (selectedPage === "all") {
            return getTodoItemPopulated(itemId, itemText, checkBox);
        } else if (selectedPage === "completed") {
            return checkBox ? (
                getTodoItemPopulated(itemId, itemText, checkBox)
            ) : (
                <></>
            );
        } else if (selectedPage === "active") {
            return checkBox ? (
                <></>
            ) : (
                getTodoItemPopulated(itemId, itemText, checkBox)
            );
        } else {
            return <></>;
        }
    };

    return (
        <>
            <div className="todoApp">
                <TodoHeader
                    setSelected={updateSelectedTab}
                    selectedTabStatus={selectedTabStatus}
                    setSelectedTabStatus={setSelectedTabStatus}
                />
                {selectedTab === "all" ? (
                    <TodoForm formHandler={addTask} />
                ) : (
                    <></>
                )}
                <div className="todoAppItems">
                    {todoList.map((item) => {
                        return itemSelector(
                            item.id,
                            item.text,
                            item.checked,
                            selectedTab
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default TodoBody;
