import React from "react";
import { Bell, CalendarDay, Clock, Palette, X } from "react-bootstrap-icons";
import { TextField } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function TodoForm({
  handleSubmit,
  heading = false,
  text,
  setText,
  day,
  setDay,
  time,
  setTime,
  todoProject,
  setTodoProject,
  projects,
  showButtons = false,
  setShowModal = false,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit} className="TodoForm">
        <div className="text">
          {heading && <h3>{heading}</h3>}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="To do ..."
            autoFocus
          />
        </div>
        <div className="remind">
          <Bell />
          <p>Remind Me!</p>
        </div>
        <div className="pick-day">
          <div className="title">
            <CalendarDay></CalendarDay>
            <p>Choose a day</p>
          </div>
          <DatePicker
            value={day}
            onChange={(day) => {
              setDay(day);
            }}
            renderInput={(props) => <TextField {...props} />}
          ></DatePicker>
        </div>
        <div className="pick-time">
          <div className="title">
            <Clock></Clock>
            <p>Choose a time</p>
          </div>
          <TimePicker
            value={time}
            onChange={(time) => {
              console.log(`TIME IS ${time}`);
              setTime(time);
            }}
            renderInput={(props) => <TextField {...props} />}
          ></TimePicker>
        </div>
        <div className="pick-project">
          <div className="title">
            <Palette></Palette>
            <p>Choose a Project</p>
          </div>
          <div className="projects">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  className={`project ${
                    todoProject === project.name ? "active" : ""
                  }`}
                  key={project.id}
                  onClick={() => setTodoProject(project.name)}
                >
                  {project.name}
                </div>
              ))
            ) : (
              <div style={{ color: "#ff0000" }}>
                Please add a project first!
              </div>
            )}
          </div>
        </div>
        {showButtons && (
          <div>
            <div className="cancel" onClick={() => setShowModal(false)}>
              <X size="40"></X>
            </div>
            <div className="confirm">
              <button>+ Add to do</button>
            </div>
          </div>
        )}
      </form>
    </LocalizationProvider>
  );
}

export default TodoForm;
