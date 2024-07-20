import Task from "../Task/Task";
import "./style.css";

function TasksWrapper({ tasks, setLastTaskID }) {
    const updateLastTaskID = () => {
        fetch("http://localhost:3004/tasks")
            .then(res => res.json())
            .then(data => setLastTaskID(data[data.length - 1].id));
    };
    return (
        <div className="tasksWrapper">
            {tasks.map(({ id, title, isDone }) => {
                return (
                    <Task key={id} taskID={id} done={isDone} updateLastTaskID={updateLastTaskID}>
                        {title}
                    </Task>
                );
            })}
        </div>
    );
}

export default TasksWrapper;
