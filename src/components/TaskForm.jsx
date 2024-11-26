import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch(); // Get the dispatch function from the Redux store
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask);
    } else {
      // Add your logic to save the task here
      dispatch(
        addTask({
          ...task,
          id: uuid(), // Generate a unique ID using UUID
        })
      );
    }
    navigate("/"); // Redirect to the tasks list page after saving the task
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks ]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label htmlFor="title" className="block text-sm font-bold mb-2">
        Task
      </label>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />

      <label htmlFor="description" className="block text-sm font-bold mb-2">
        Description
      </label>
      <textarea
        name="description"
        placeholder="description"
        cols="30"
        rows="5"
        onChange={handleChange}
        value={task.description}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      ></textarea>
      <button className="bg-indigo-600 px-2 py-1">Save</button>
    </form>
  );
};
