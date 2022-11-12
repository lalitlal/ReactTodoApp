import React, { useRef, useContext, useEffect } from "react";
import { TodoContext } from "../context";

function Sidebar({ children }) {
  const sideBarRef = useRef();
  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  const handleClick = (e) => {
    if (
      e.target === sideBarRef.current ||
      sideBarRef.current.contains(e.target)
    ) {
      setSelectedTodo(undefined);
    }
  };
  return (
    <div className="Sidebar" ref={sideBarRef}>
      {children}
    </div>
  );
}

export default Sidebar;
