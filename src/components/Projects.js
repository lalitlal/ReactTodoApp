import React, { useState, useContext } from "react";
import Project from "./Project";
import AddNewProject from "./AddNewProject";
import { Palette, PencilFill, CaretUp } from "react-bootstrap-icons";
import { TodoContext } from "../context";
import { useSpring, animated } from "react-spring";

function Projects() {
  const [showMenu, setShowMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const pencilColor = edit ? "#1EC94C" : "#000000";

  // CONTEXT
  const { projects } = useContext(TodoContext);

  // ANIMATION
  const spin = useSpring({
    transform: showMenu ? "rotate(0deg)" : "rotate(180deg",
    config: { friction: 10 },
  });

  const menuAnimation = useSpring({
    display: showMenu ? "block" : "none",
    lineHeight: showMenu ? 1.2 : 0,
  });

  return (
    <div className="Projects">
      <div className="header">
        <div className="title">
          <Palette size="18"></Palette>
          <p>Projects</p>
        </div>
        <div className="btns">
          {showMenu && projects.length > 0 && (
            <span className="edit" onClick={() => setEdit((edit) => !edit)}>
              <PencilFill size="15" color={pencilColor}></PencilFill>
            </span>
          )}
          <AddNewProject></AddNewProject>
          <animated.span
            className="arrow"
            onClick={() => setShowMenu(!showMenu)}
            style={spin}
          >
            <CaretUp size="20"></CaretUp>
          </animated.span>
        </div>
      </div>
      <animated.div style={menuAnimation} className="items">
        {projects.map((project) => (
          <Project project={project} key={project.id} edit={edit}></Project>
        ))}
      </animated.div>
    </div>
  );
}

export default Projects;
