import { useState, useEffect, useReducer } from "react";

import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TasksWrapper from "./components/TasksWrapper/TasksWrapper";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState([]);
    const [state, dispatch] = useReducer(reducer, []);
    const [lastTaskID, setLastTaskID] = useState(null);

    function reducer(state, action) {
        async function get() {
            const res = await fetch("http://localhost:3004/tasks");
            const data = await res.json();

            setTasks(data);
            setLastTaskID(data.length ? data[data.length - 1].id : null);
            console.log("getting...");
        }

        switch (action.type) {
            case "get":
                get();
                break;
            case "add":
                fetch("http://localhost:3004/tasks", {
                    method: "POST",
                    body: JSON.stringify(action.payload),
                    headers: { "Content-type": "application/json" },
                }).then(get);
                console.log("adding...");

                break;
            default:
                return state;
        }
    }

    useEffect(() => {
        dispatch({ type: "get" });
    }, []);

    return (
        <div className="container">
            <NewTaskForm
                addNewTask={dispatch}
                lastTaskID={lastTaskID}
                setLastTaskID={setLastTaskID}
            />

            {!!tasks.length && (
                <TasksWrapper tasks={tasks} setLastTaskID={setLastTaskID} />
            )}

            {!tasks?.length && (
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

// async function getTasks() {
//     const res = await fetch("http://localhost:3004/tasks");
//     const data = await res.json();

//     setTasks(data);
//     setLastTaskID(data.length ? data[data.length - 1].id : null);
// }
