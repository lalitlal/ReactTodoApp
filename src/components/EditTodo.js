import React, { useState, useContext, useEffect } from "react";
import TodoForm from "./TodoForm";
import dayjs from "dayjs";
import { TodoContext } from "../context";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function EditTodo() {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [day, setDay] = useState(dayjs(new Date()));
  const [time, setTime] = useState(dayjs(new Date()));
  const [todoProject, setTodoProject] = useState();

  // CONTEXT
  const { selectedTodo, setSelectedTodo, projects } = useContext(TodoContext);

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setDay(dayjs(selectedTodo.date, "MM/DD/YYYY"));
      setTime(dayjs(selectedTodo.time, "hh:mm A"));
      setTodoProject(selectedTodo.projectName);
    }
  }, [selectedTodo]);

  useEffect(() => {
    const _updateDoc = async (docRef) => {
      await updateDoc(docRef, {
        text,
        date: dayjs(day).format("MM/DD/YYYY"),
        day: dayjs(day).format("d"),
        time: dayjs(time).format("hh:mm A"),
        projectName: todoProject,
      });
    };
    if (selectedTodo) {
      const docRef = doc(db, "todos", selectedTodo.id);
      _updateDoc(docRef);
    }
  }, [text, day, time, todoProject]);

  function handleSubmit(e) {}

  return (
    <div>
      {selectedTodo && (
        <div className="EditTodo">
          <div className="header">Edit Todo</div>
          <div className="container">
            <TodoForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              day={day}
              setDay={setDay}
              time={time}
              setTime={setTime}
              todoProject={todoProject}
              setTodoProject={setTodoProject}
              projects={projects}
            ></TodoForm>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditTodo;
