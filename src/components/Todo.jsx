import React, { useState } from "react";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";
import Confetti from "react-confetti";

const Todo = () => {
  const [taskInput, setTaskInput] = useState("");
  const [allTask, setAllTask] = useState([]); // Initialize as an array
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  // Handler to submit or update a task
  const submitHandler = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return; // Avoid adding empty tasks

    if (isEditing) {
      // If editing, update the task
      const updatedTasks = [...allTask];
      updatedTasks[currentTaskIndex].task = taskInput; // Update task name only
      setAllTask(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } else {
      // If adding a new task
      setAllTask([...allTask, { task: taskInput, completed: false }]);
    }

    setTaskInput(""); // Clear the input field
  };

  // Handler to delete a task
  const deleteHandler = (index) => {
    let copyTask = [...allTask];
    copyTask.splice(index, 1);
    setAllTask(copyTask);
  };

  // Handler to start editing a task
  const editHandler = (index) => {
    setTaskInput(allTask[index].task); // Populate the input field with the selected task
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  // Handler to toggle task completion
  const toggleCompleteHandler = (index) => {
    const updatedTasks = [...allTask];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setAllTask(updatedTasks);
  };

  // Calculate total tasks and completed tasks
  const totalTasks = allTask.length;
  const completedTasks = allTask.filter((task) => task.completed).length;

  // Calculate progress percentage
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Trigger confetti when all tasks are completed
  const allTasksCompleted = totalTasks > 0 && completedTasks === totalTasks;

  let renderTask = (
    <h2 className="bg-white px-4 py-2 rounded mb-4">
      Please add your first task
    </h2>
  );

  // Render tasks
  if (totalTasks > 0) {
    renderTask = allTask.map((taskItem, index) => {
      const taskClasses = taskItem.completed
        ? "line-through text-teal-800"
        : ""; // Conditionally apply classes

      return (
        <li key={index}>
          <div className="task-item flex items-center justify-between gap-4 bg-white px-4 py-2 rounded mb-4">
            <div className="task flex items-center gap-4 ">
              <input
                type="checkbox"
                checked={taskItem.completed}
                onChange={() => toggleCompleteHandler(index)}
              />
              <div className={`taskText flex-1 ${taskClasses}`}>
                {taskItem.task}
              </div>
            </div>
            <div className="icons flex">
              {/* Edit button */}
              <button
                className="w-9 p-2"
                onClick={() => {
                  editHandler(index);
                }}
              >
                <img src={editIcon} alt="Edit" />
              </button>
              {/* Delete button */}
              <button
                className="w-9 p-2"
                onClick={() => {
                  deleteHandler(index);
                }}
              >
                <img src={deleteIcon} alt="Delete" />
              </button>
            </div>
          </div>
        </li>
      );
    });
  }

  return (
    <div className="">
      {/* Confetti Component - Only displayed when all tasks are completed */}
      {allTasksCompleted && <Confetti />}

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
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-teal-900 h-32 w-32 flex items-center justify-center rounded-full">
            <div id="statNumbers" className="text-5xl text-white">
              {completedTasks} / {totalTasks}
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
            {isEditing ? "✓" : "+"} {/* Change button text based on mode */}
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
