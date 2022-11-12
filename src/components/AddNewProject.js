import React, { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function AddNewProject() {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    if (projectName) {
      const projectCol = collection(db, "projects");
      const q = query(projectCol, where("name", "==", projectName));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        addDoc(projectCol, {
          name: projectName,
        });
      } else {
        alert("Project already exists!");
      }

      setShowModal(false);
      setProjectName("");
    }
  }

  return (
    <div className="AddNewProject">
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <Plus size="20"></Plus>
        </span>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProjectForm
          handleSubmit={handleSubmit}
          heading="New Project!"
          value={projectName}
          setValue={setProjectName}
          setShowModal={setShowModal}
          confirmButtonText="+ Add Project"
        ></ProjectForm>
      </Modal>
    </div>
  );
}

export default AddNewProject;
