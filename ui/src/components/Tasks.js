import React from "react";
import EditTaskModal from "./EditTaskModal";

export const Tasks = ({
  tasks,
  deleteTask,
  taskEdited,
  message,
  setMessage,
  alert,
  setAlert,
}) => {
  // console.log('tasks length:::', tasks)
  if (tasks.length === 0) return null;

  const TaskRow = (task, index) => {
    return (
      <tr key={index} className={index % 2 === 0 ? "odd" : "even"}>
        <td>{task._id}</td>
        <td id={`td-${index}`}>{task.task}</td>
        <td>{task.assignee}</td>
        <td>
          <div className="row">
            <div className="col-md-6">{task.status}</div>
            <div className="col-md-3">
              <EditTaskModal
                task={task}
                taskEdited={taskEdited}
                message={message}
                setMessage={setMessage}
                alert={alert}
                setAlert={setAlert}
                id={index}
              />
            </div>
            <div className="col-md-3">
              <button
                type="button"
                id={`delete-btn-${index}`}
                onClick={(e) => deleteTask(task._id)}
                className="btn btn-danger right"
              >
                Delete
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  const taskTable = tasks.map((task, index) => TaskRow(task, index));

  return (
    <div className="container">
      <h2>Tasks</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task Id</th>
            <th>Task Name</th>
            <th>Assignee</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{taskTable}</tbody>
      </table>
    </div>
  );
};
