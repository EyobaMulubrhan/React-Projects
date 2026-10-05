import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim() === "") {
      return;
    }

    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const completedTasks = tasks.filter((task) => task.completed).length;
  const remainingTasks = tasks.length - completedTasks;

  return (
    <main className="todo-page">
      <section className="todo-container">

        <header className="todo-header">
          <div>
            <h1>My Tasks</h1>
            <p className="subtitle">
              Organize your day and stay on top of your work.
            </p>
          </div>

          <div className="task-count">
            <strong>{tasks.length}</strong>
            <span>Tasks</span>
          </div>
        </header>

        <div className="task-input">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>+</button>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h2>No tasks yet</h2>
              <p>Add your first task to get started.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                className={`task-item ${
                  task.completed ? "completed" : ""
                }`}
                key={task.id}
              >
                <button
                  className="check-button"
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? "✓" : ""}
                </button>

                <span className="task-text">{task.text}</span>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <footer className="todo-footer">
          <span>{remainingTasks} remaining</span>
          <span>{completedTasks} completed</span>
        </footer>

      </section>
    </main>
  );
}

export default App;