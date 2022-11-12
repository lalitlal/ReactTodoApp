import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import dayjs from "dayjs";

// Inspired from:
// https://blog.logrocket.com/build-crud-application-react-firebase-web-sdk-v9/#:~:text=To%20integrate%20Firebase%20into%20our,Firebase%20in%20our%20react%20app.&text=Copy%20the%20config%20to%20the,console%20to%20complete%20the%20process.
export function useTodos() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const q = collection(db, "todos");
    let unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsubscribe();
  }, []);
  return todos;
}

export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const q = collection(db, "projects");
    let unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
          };
        })
      );
    });
    return () => unsubscribe();
  }, []);
  return projects;
}

export function useFilterTodos(todos, selectedProject) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let data;
    const todayDateFormated = dayjs().format("MM/DD/YYYY");

    if (selectedProject === "today") {
      data = todos.filter((todo) => todo.date === todayDateFormated);
    } else if (selectedProject === "next 7 days") {
      data = todos.filter((todo) => {
        const todoDate = dayjs(todo.date, "MM/DD/YYYY");
        const todayDate = dayjs(todayDateFormated, "MM/DD/YYYY");

        const diffDays = todoDate.diff(todayDate, "day");

        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedProject === "all days") {
      data = todos;
    } else {
      data = todos.filter((todo) => todo.projectName === selectedProject);
    }
    setFilteredTodos(data);
  }, [todos, selectedProject]);

  return filteredTodos;
}

export function useProjectsWithStats(projects, todos) {
  const [projectsWithStats, setProjectsWithStats] = useState([]);

  useEffect(() => {
    const data = projects.map((project) => {
      return {
        numOfTodos: todos.filter(
          (todo) => todo.projectName === project.name && !todo.checked
        ).length,
        ...project,
      };
    });
    setProjectsWithStats(data);
  }, [projects, todos]);
  return projectsWithStats;
}
