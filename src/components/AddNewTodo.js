import React, { useState, useContext, useEffect } from "react";
import Modal from "./Modal";
import TodoForm from "./TodoForm";
import { TodoContext } from "../context";
import { calendarItems } from "../constants/index";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import randomcolor from "randomcolor";
import dayjs from "dayjs";

function AddNewTodo() {
  const { projects, selectedProject } = useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(dayjs(new Date()));
  const [time, setTime] = useState(dayjs(new Date()));
  const [todoProject, setTodoProject] = useState(selectedProject);

  function handleSubmit(e) {
    e.preventDefault();

    if (text && !calendarItems.includes(todoProject)) {
      addDoc(collection(db, "todos"), {
        text: text,
        date: day.format("MM/DD/YYYY"),
        day: day.format("d"),
        time: time.format("hh:mm A"),
        checked: false,
        color: randomcolor({ luminosity: "dark" }),
        projectName: todoProject,
      });
      setShowModal(false);
      setText("");
      setDay(dayjs(new Date()));
      setTime(dayjs(new Date()));
    }
  }

  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);

  return (
    <div className="AddNewTodo">
      <div className="btn">
        <button onClick={() => setShowModal(true)}>+ New Todo</button>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <TodoForm
          handleSubmit={handleSubmit}
          heading="Add new to do!"
          text={text}
          setText={setText}
          day={day}
          setDay={setDay}
          time={time}
          setTime={setTime}
          todoProject={todoProject}
          setTodoProject={setTodoProject}
          projects={projects}
          showButtons={true}
          setShowModal={setShowModal}
        ></TodoForm>
      </Modal>
    </div>
  );
}

export default AddNewTodo;
