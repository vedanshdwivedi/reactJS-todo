import React, { useEffect, useState } from "react";
import { makeApiCall } from "../../utils/utility";
import TodoForm from "../TodoForm/TodoForm";
import TodoHeader from "../TodoHeader/TodoHeader";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoBody.css";

const TodoBody = () => {
    const [loadFromStorage, setLoadFromStorage] = useState(true);
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
        if (loadFromStorage) {
            const storedTodoList = localStorage.getItem("todoList");
            if (storedTodoList) {
                setTodoList(JSON.parse(storedTodoList));
            }

            const counter = localStorage.getItem("taskCounter");
            if (counter) {
                setTaskCounter(parseInt(counter));
            }

            setLoadFromStorage(false);
        }
    }, [loadFromStorage]);

    const saveLocally = (listVal, counterVal) => {
        localStorage.setItem("todoList", JSON.stringify(listVal));
        localStorage.setItem("taskCounter", counterVal);
    };

    const addTask = (text) => {
        const newTodo = {
            text,
            checked: false,
            id: taskCounter,
        };

        const newList = [...todoList, newTodo];
        const newCount = taskCounter + 1;

        setTaskCounter(newCount);
        setTodoList(newList);

        saveLocally(newList, newCount);
    };

    const updateTaskStatus = (taskId, checked) => {
        const updatedTodoList = [...todoList];
        const taskIndex = updatedTodoList.findIndex(
            (item) => item.id === taskId
        );

        if (taskIndex !== -1) {
            makeApiCall({
                event: "Task Checkbox Updated",
                metadata: { oldTask: updatedTodoList[taskIndex] },
            });
            updatedTodoList[taskIndex].checked = checked;
            setTodoList(updatedTodoList);

            localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
        }
    };

    const deleteTask = (taskId) => {
        const updatedTodoList = [...todoList];
        const taskIndex = updatedTodoList.findIndex(
            (item) => item.id === taskId
        );

        if (taskIndex !== -1) {
            makeApiCall({
                event: "Task Deleted",
                metadata: { deleted: todoList[taskIndex] },
            });
        }

        const filteredTodoList = updatedTodoList.filter(
            (item) => item.id !== taskId
        );
        setTodoList(filteredTodoList);

        localStorage.setItem("todoList", JSON.stringify(filteredTodoList));
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
                deleteHandler={selectedTab === "completed" ? deleteTask : null}
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
                    {selectedTab === "completed" ? (
                        <>
                            <button
                                className="todoReset"
                                onClick={() => {
                                    setTodoList([]);
                                    setTaskCounter(0);
                                    saveLocally([], 0);
                                }}
                            >
                                <i className="ri-delete-bin-line"></i>&nbsp;
                                Delete All
                            </button>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

export default TodoBody;
