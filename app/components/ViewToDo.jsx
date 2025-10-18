"use client";
import { useEffect, useState } from "react";

const ViewToDo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/viewtodo");

      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.log(err);
      setError("Could not load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/deletetodo/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete todo");
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>loading todos</p>;
  if (error) return <p>error</p>;
  return (
    <div>
      <h1> todo list</h1>
      {todos.length === 0 ? (
        <p>no todos found</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              {todo.title} - {todo.description}
              <button onClick={() => handleDelete(todo._id)}>delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewToDo;
