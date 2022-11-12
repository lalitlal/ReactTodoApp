import React, { useState, useContext } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
import { TodoContext } from "../context";
import { useTransition, useSpring, animated } from "react-spring";

import {
  CheckCircleFill,
  Circle,
  ArrowClockwise,
  Trash,
} from "react-bootstrap-icons";

function Todo({ todo }) {
  const [hover, setHover] = useState(false);

  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  async function deleteTodo(todo) {
    const docRef = doc(db, "todos", todo.id);
    await deleteDoc(docRef);
  }

  async function handleTodo(todo) {
    deleteTodo(todo);
    if (selectedTodo === todo) {
      setSelectedTodo(undefined);
    }
  }

  const checkTodo = async (todo) => {
    const todoDoc = doc(db, "todos", todo.id);
    await updateDoc(todoDoc, {
      checked: !todo.checked,
    });
  };

  const repeatNextDay = (todo) => {
    const nextDayDate = dayjs(todo.date, "MM/DD/YYYY").add(1, "days");

    const repeatedTodo = {
      ...todo,
      checked: false,
      date: nextDayDate.format("MM/DD/YYYY"),
      day: nextDayDate.format("d"),
    };
    delete repeatedTodo.id;
    addDoc(collection(db, "todos"), repeatedTodo);
  };

  // ANIMATION
  const fadeIn = useSpring({
    from: { marginTop: "-12px", opacity: 0 },
    to: { marginTop: "0px", opacity: 1 },
  });

  const checkTransitions = useTransition(todo.checked, {
    from: { position: "absolute", transform: "scale(0)" },
    enter: { transform: "scale(1)" },
    leave: { transform: "scale(0)" },
  });

  return (
    <animated.div style={fadeIn} className="Todo">
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo" onClick={() => checkTodo(todo)}>
          {checkTransitions((props, checked) =>
            checked ? (
              <animated.span style={props} className="checked">
                <CheckCircleFill color="#bebebe"></CheckCircleFill>
              </animated.span>
            ) : (
              <animated.span style={props} className="unchecked">
                <Circle color={todo.color}></Circle>
              </animated.span>
            )
          )}
        </div>
        <div className="text" onClick={() => setSelectedTodo(todo)}>
          <p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
            {todo.text}
          </p>
          <span>
            {todo.time} - {todo.projectName}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>
        <div className="add-to-next-day" onClick={() => repeatNextDay(todo)}>
          {todo.checked && (
            <span>
              <ArrowClockwise></ArrowClockwise>
            </span>
          )}
        </div>
        <div className="delete-todo" onClick={() => handleTodo(todo)}>
          {(hover || todo.checked) && (
            <span>
              <Trash></Trash>
            </span>
          )}
        </div>
      </div>
    </animated.div>
  );
}

export default Todo;
