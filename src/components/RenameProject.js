import React, { useState, useContext } from "react";
import ProjectForm from "./ProjectForm";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { TodoContext } from "../context";

function RenameProject({ project, setShowModal }) {
  const [newProjectName, setNewProjectName] = useState(project.name);
  const { selectedProject, setSelectedProject } = useContext(TodoContext);

  async function renameProject(project, newProjectName) {
    const projectCol = collection(db, "projects");
    const todoCol = collection(db, "todos");

    const { name: oldProjectName } = project;
    let q = query(projectCol, where("name", "==", newProjectName));
    let querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("Project with same name arleady exists!");
    } else {
      const docRef = doc(db, "projects", project.id);
      await updateDoc(docRef, {
        name: newProjectName,
      });

      q = query(todoCol, where("projectName", "==", oldProjectName));
      querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          projectName: newProjectName,
        });
      });

      if (selectedProject === oldProjectName) {
        setSelectedProject(newProjectName);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    renameProject(project, newProjectName);
    setShowModal(false);
  }
  return (
    <div className="RenameProject">
      <ProjectForm
        handleSubmit={handleSubmit}
        heading="Edit project name!"
        value={newProjectName}
        setValue={setNewProjectName}
        setShowModal={setShowModal}
        confirmButtonText="Confirm"
      ></ProjectForm>
    </div>
  );
}

export default RenameProject;
