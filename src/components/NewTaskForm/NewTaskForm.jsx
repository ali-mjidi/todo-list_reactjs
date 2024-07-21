import { useState } from "react";
import "./style.css";

function NewTaskForm({ addNewTask, lastTaskID, setLastTaskID }) {
    const [newTask, setNewTask] = useState("");

    function addTask(e) {
        e.preventDefault();
        if (!newTask) {
            alert("Please enter something");
        } else {
            const newTaskData = {
                id: String(+lastTaskID + 1),
                title: newTask.trim(),
                isDone: false,
            };

            addNewTask({ type: "add", payload: newTaskData });
            setLastTaskID(newTaskData.id);
            setNewTask("");
        }
    }

    function newTaskInput(e) {
        setNewTask(e.target.value);
    }

    return (
        <form className="newTask" onSubmit={addTask}>
            <input
                type="text"
                className="newTask__input"
                placeholder="Enter New Task"
                value={newTask}
                onInput={newTaskInput}
            />
            <button className="newTask__submit">Add New Task</button>
        </form>
    );
}

export default NewTaskForm;
