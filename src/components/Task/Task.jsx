import { useState } from "react";
import "./style.css";

function Task({ children: initialTask, done, taskID, updateTask }) {
    const [isDone, setIsDone] = useState(done);
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(initialTask);
    const [prevTask, setPrevTask] = useState("");
    const [showMoreOptions, setShowMoreOptions] = useState(false);

    function toggleMoreOptions() {
        setShowMoreOptions(wasShowing => !wasShowing);
    }

    function toggleDone() {
        const newData = { isDone: !isDone };

        updateTask({ type: "update", payload: { id: taskID, body: newData } });
        setIsDone(wasDone => !wasDone);
    }

    function toggleEditing() {
        setPrevTask(prevTask => (prevTask = isEditing ? "" : task));
        setIsEditing(wasEditing => !wasEditing);
    }

    function cancelEdit() {
        setTask(prevTask);
        toggleEditing();
    }

    function editTaskInput(e) {
        setTask(e.target.value);
    }

    function editTaskSubmit(e) {
        const newData = { title: task.trim() };

        updateTask({ type: "update", payload: { id: taskID, body: newData } });
        toggleEditing();
        setTask(task => task.trim());
        e.preventDefault();
    }

    function deleteTask() {
        updateTask({ type: "delete", payload: taskID });
    }

    return (
        <form className="task" onSubmit={editTaskSubmit}>
            <i
                className={`fi fi-bs-menu-dots moreOptions ${
                    showMoreOptions ? "show" : ""
                }`}
                onClick={toggleMoreOptions}>
                <ul className="options">
                    <li className="option done" onClick={toggleDone}>
                        <i className="fi fi-bs-check"></i>
                        {isDone ? "UnDone" : "Done"}
                    </li>
                    <li
                        className="option edit"
                        onClick={isEditing ? cancelEdit : toggleEditing}>
                        <i
                            className={`fi ${
                                isEditing
                                    ? "fi-rr-cross-circle"
                                    : "fi-rr-pencil"
                            }`}></i>
                        {isEditing ? "Cancel" : "Edit"}
                    </li>
                    <li className="option delete" onClick={deleteTask}>
                        <i className="fi fi-rs-trash"></i> Delete
                    </li>
                </ul>
            </i>
            <div
                className={`overlay ${showMoreOptions ? "show" : ""}`}
                onClick={toggleMoreOptions}></div>
            <input
                type="text"
                className={`task__title ${isDone ? "task__title--done" : ""}`}
                value={task}
                onInput={editTaskInput}
                disabled={!isEditing}
            />
        </form>
    );
}

export default Task;
