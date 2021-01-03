import { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);

  const addNewTask = (task) => setList((list) => [...list, task]);
  return (
    <div className="App">
      <h1 data-cypress-id="mainHeader">Tested To-Do List</h1>
      <InputForm submitHandler={addNewTask} />
      <TaskList
        tasks={list}
        onDelete={(id) => setList(list.filter((item) => item.id !== id))}
        onUpdate={(itemToUpdate) =>
          setList(
            list.map((item) =>
              item.id === itemToUpdate.id ? itemToUpdate : item
            )
          )
        }
      />
    </div>
  );
}

const generateRandomId = () => Math.floor(Math.random() * 1_000_000).toString();

function InputForm({ submitHandler }) {
  const [taskName, setTaskName] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    submitHandler({
      name: taskName,
      id: generateRandomId(),
    });
    setTaskName("");
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <p>Enter Item</p>
      <input data-cypress-input="create-input" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      <button data-cypress-button="create-button">submit</button>
    </form>
  );
}

function TaskList({ tasks, onDelete, onUpdate }) {
  return (
    <>
      <h3>task list</h3>
      <ul>
        {tasks?.map((task) => {
          return <Task key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} />;
        })}
      </ul>
    </>
  );
}

function Task({ task, onDelete, onUpdate }) {
  const [updateTaskName, setUpdateTaskName] = useState("");
  const [updateTaskOpen, setUpdateTaskOpen] = useState(false);

  const updateTaskNameHandler = (e) => {
    if (updateTaskOpen) {
      onUpdate({
        ...task,
        name: updateTaskName,
      });
      setUpdateTaskOpen(false);
      setUpdateTaskName("");
    } else {
      setUpdateTaskOpen(true);
    }
  };
  return (
    <li
      style={{ display: "flex", justifyContent: "space-between" }}
      data-cypress-taskname={task.name}
    >
      {task.name} <button data-cypress-button-delete-taskname={task.name} onClick={(e) => onDelete(task.id)}>delete</button>{" "}
      <input
        data-cypress-input-taskname={task.name}
        style={{ display: updateTaskOpen ? "block" : "none" }}
        value={updateTaskName}
        onChange={(e) => setUpdateTaskName(e.target.value)}
      />
      <button data-cypress-button-update-taskname={task.name} onClick={(e) => updateTaskNameHandler()}>update</button>
    </li>
  );
}
export default App;
