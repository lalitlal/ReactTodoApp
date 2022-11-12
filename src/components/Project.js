import React, { useState, useContext } from "react";
import RenameProject from "./RenameProject";
import { Pencil, XCircle } from "react-bootstrap-icons";
import Modal from "./Modal";
import { TodoContext } from "../context";
import { db } from "../firebase";
import {
  collection,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useTransition, useSpring, animated } from "react-spring";

function Project({ project, edit }) {
  const { defaultProject, selectedProject, setSelectedProject } = useContext(
    TodoContext
  );
  const [showModal, setShowModal] = useState(false);

  async function deleteProject(project) {
    const docRef = doc(db, "projects", project.id);
    await deleteDoc(docRef);

    const todoCol = collection(db, "todos");
    const q = query(todoCol, where("projectName", "==", project.name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    if (selectedProject === project.name) {
      setSelectedProject(defaultProject);
    }
  }

  // ANIMATION
  const fadeIn = useSpring({
    from: { marginTop: "-12px", opacity: 0 },
    to: { marginTop: "0px", opacity: 1 },
  });

  const btnTransitions = useTransition(edit, {
    from: { opacity: 0, right: "-20px" },
    enter: { opacity: 1, right: "0px" },
    leave: { opacity: 0, right: "-20px" },
  });

  return (
    <animated.div style={fadeIn} className="Project">
      <div className="name" onClick={() => setSelectedProject(project.name)}>
        {project.name}
      </div>
      <div className="btns">
        {btnTransitions((props, editProject) =>
          editProject ? (
            <animated.div style={props} className="edit-delete">
              <span className="edit" onClick={() => setShowModal(true)}>
                <Pencil size="13"></Pencil>
              </span>
              <span className="delete" onClick={() => deleteProject(project)}>
                <XCircle size="13"></XCircle>
              </span>
            </animated.div>
          ) : project.numOfTodos === 0 ? (
            ""
          ) : (
            <animated.div style={props} className="total-todos">
              {project.numOfTodos}
            </animated.div>
          )
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <RenameProject
          project={project}
          setShowModal={setShowModal}
        ></RenameProject>
      </Modal>
    </animated.div>
  );
}

export default Project;
