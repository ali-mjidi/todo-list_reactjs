import { useState } from "react";

import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TasksWrapper from "./components/TasksWrapper/TasksWrapper";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [lastTaskID, setLastTaskID] = useState(null);

    async function getTasks() {
        const res = await fetch("http://localhost:3004/tasks");
        const data = await res.json();

        setTasks(data);

        if (!lastTaskID) {
            setLastTaskID(data[data.length - 1].id);
        }
    }

    getTasks();

    return (
        <div className="container">
            <NewTaskForm
                lastTaskID={lastTaskID}
                setLastTaskID={setLastTaskID}
            />

            {!!tasks.length && (
                <TasksWrapper tasks={tasks} setLastTaskID={setLastTaskID} />
            )}

            {!tasks.length && (
                <div className="noTask">
                    <h2 className="noTask__header">No Task Available</h2>
                    <p className="noTask__paragraph">
                        You can add a new task using the input above
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
