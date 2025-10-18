"use client";
import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ViewToDo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

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

  const startEditing = (id) => setEditingTodoId(id);
  const stopEditing = () => setEditingTodoId(null);

  const handleUpdate = (updateTodo) => {
    setTodos(todos.map((t) => (t._id === updateTodo._id ? updateTodo : t)));
    stopEditing();
  };

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

  if (loading)
    return <p className="text-gray-400 text-center mt-6">loading todos</p>;
  if (error) return <p className="text-red-400 text-center mt-6">error</p>;
  return (
    <div className="min-h-screen text-white font-mono flex flex-col items-center justify-start p-6">
      {todos.length === 0 ? (
        <p className="text-gray-400">no todos found</p>
      ) : (
        <ul className="w-80 max-w-md space-y-4">
          {todos.map((todo) => (
            <li
              className="bg-gray-900 p-4 rounded-lg flex flex-col space-y-2 shadow-md"
              key={todo._id}
            >
              <div className="flex justify-between item-center">
                <span className="font-medium">{todo.title}</span>
                <div className="space-x-2">
                  <button
                    className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm"
                    onClick={() => startEditing(todo._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-700 hover:bg-gray-600 text-sm"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-gray-400">{todo.description}</p>

              {editingTodoId === todo._id && (
                <EditTodo
                  todo={todo}
                  onUpdate={handleUpdate}
                  onCancle={stopEditing}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewToDo;
