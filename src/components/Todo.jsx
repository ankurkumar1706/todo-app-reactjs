import React, { useState } from "react";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";

const Todo = () => {
  const [taskInput, setTaskInput] = useState("");
  const [allTask, setAllTask] = useState([]); // Initialize as an array

  const submitHandler = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return; // Avoid adding empty tasks
    setAllTask([...allTask, taskInput]);
    setTaskInput("");
  };

  let renderTask = (
    <h2 className="bg-white px-4 py-2 rounded mb-4">
      Please add your first task
    </h2>
  );

  if (allTask.length > 0) {
    renderTask = allTask.map((task, index) => {
      return (
        <li key={index}>
          <div className="task-item flex items-center justify-between gap-4 bg-white px-4 py-2 rounded mb-4">
            <div className="task flex items-center gap-4 ">
              <input type="checkbox" />
              <div className="taskText flex-1">{task}</div>
            </div>
            <div className="icons flex">
              <button className="w-9 p-2">
                <img src={editIcon} alt="Edit" />
              </button>
              <button className="w-9 p-2">
                <img src={deleteIcon} alt="Delete" />
              </button>
            </div>
          </div>
        </li>
      );
    });
  }

  return (
    <div>
      <div className="container max-w-lg mx-auto p-5">
        <div className="flex text-white justify-between border-2 border-teal-200 p-8 rounded-2xl">
          <div>
            <div>
              <h1 className="text-5xl">Todo Done</h1>
              <p>Keep It Up</p>
            </div>
            <div className="mt-10">
              <div
                id="progressBar"
                className="w-full bg-white rounded-full h-4 mb-4 dark:bg-gray-700"
              >
                <div
                  id="progress"
                  className="bg-teal-400 h-4 rounded-full dark:bg-blue-500"
                  style={{ width: 0 }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-teal-900 h-32 w-32 flex items-center justify-center rounded-full">
            <div id="statNumbers" className="text-5xl text-white">
              0 / 0
            </div>
          </div>
        </div>

        <form
          onSubmit={submitHandler}
          className="flex justify-center items-center gap-4 mt-10"
        >
          <input
            id="taskInput"
            className="bg-teal-900 h-12 rounded border border-teal-200 p-4 w-full outline-0 text-white"
            type="text"
            placeholder="Write your task"
            value={taskInput}
            onChange={(e) => {
              setTaskInput(e.target.value);
            }}
          />
          <button
            id="addTaskBtn"
            className="text-4xl text-white h-12 w-12 bg-teal-400 rounded-full leading-1 flex-none"
            type="submit"
          >
            +
          </button>
        </form>
        <ul id="taskList" className="task-list mt-10">
          {renderTask}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
