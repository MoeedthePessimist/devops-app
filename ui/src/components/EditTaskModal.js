import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { editTask } from "../services/TaskService";

export default function EditTaskModal({
  task,
  taskEdited,
  message,
  setMessage,
  alert,
  setAlert,
  id,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    setAlert(true);
    if (!data.task || !data.assignee) {
      setMessage("FAILED, PLEASE FILL IN ALL THE FIELDS");
      setAlert("failed");
      return;
    }
    setMessage("PASSED, TASK UPDATED");
    setAlert("passed");
    editTask(data).then((response) => {
      taskEdited(response);
      setShow(false);
    });
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow} id={`edit-btn-${id}`}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="form-group col-md-3">
                <label htmlFor="taskId">Id</label>
                <input
                  {...register("id")}
                  type="text"
                  className="form-control"
                  defaultValue={task.id}
                  name="id"
                  id="id"
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="task">Task</label>
                <input
                  {...register("task")}
                  type="text"
                  className="form-control"
                  defaultValue={task.task}
                  name="task"
                  id="edit-task"
                  placeholder="Create a Task"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="assignee">Assignee</label>
                <input
                  {...register("assignee")}
                  type="text"
                  className="form-control"
                  defaultValue={task.assignee}
                  name="assignee"
                  id="edit-assignee"
                  placeholder="Assignee"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="status">Status:</label>
                <select
                  {...register("status")}
                  name="status"
                  defaultValue={task.status}
                  className="form-control"
                  id="edit-status"
                >
                  <option>To Be Done</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            {message && alert === "failed" ? (
              <p style={{ color: "red", marginTop: "20px" }} id="message">
                {message}
              </p>
            ) : (
              <p style={{ color: "lime", marginTop: "20px" }} id="message">
                {message}
              </p>
            )}
            <div className="btncenter">
              <input
                type="submit"
                className="btn btn-danger"
                id={`edit-btn-submit-${id}`}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
