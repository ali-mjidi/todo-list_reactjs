import { useState } from "react";
import "./style.css";

function NewTaskForm({ lastTaskID, setLastTaskID }) {
    const [newTask, setNewTask] = useState("");

    function addTask(e) {
        e.preventDefault();
        if (!newTask) {
            alert("Please enter something");
        } else {
            const task = {
                id: String(+lastTaskID + 1),
                title: newTask.trim(),
                isDone: false,
            };

            fetch("http://localhost:3004/tasks", {
                method: "POST",
                body: JSON.stringify(task),
                headers: { "Content-type": "application/json" },
            });

            setLastTaskID(task.id);
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
