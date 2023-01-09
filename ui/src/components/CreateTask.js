import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createTask } from "../services/TaskService";

export default function CreateTask(props) {
  const { register, handleSubmit } = useForm();

  const { message, setMessage, alert, setAlert } = props;

  const onSubmit = (data, e) => {
    // console.log(data);
    setAlert(true);
    if (!data.task || !data.assignee) {
      setMessage("FAILED, PLEASE FILL IN ALL THE FIELDS");
      setAlert("failed");
      return;
    }
    setMessage("PASSED, TASK CREATED");
    setAlert("passed");
    createTask(data).then((response) => {
      props.taskCreated();
      e.target.reset();
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mrgnbtm">
          <h2>ToDo List</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mrgnbtm">
              <div className="form-group col-md-6">
                <label htmlFor="exampleInputEmail1">Task</label>
                <input
                  {...register("task")}
                  placeholder="Create a Task"
                  className="form-control"
                  name="task"
                  id="task"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="exampleInputPassword1">Assignee</label>
                <input
                  {...register("assignee")}
                  placeholder="Assignee"
                  className="form-control"
                  name="assignee"
                  id="assignee"
                />
              </div>
            </div>
            <div className="row mrgnbtm">
              <div className="form-group col-md-12">
                <label htmlFor="exampleInputEmail1">Status:</label>
                <select className="form-control" {...register("status")}>
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
            <input type="submit" className="btn btn-danger mrgnbtm" />
          </form>
        </div>
      </div>
    </div>
  );
}
