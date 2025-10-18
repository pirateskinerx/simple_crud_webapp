import { useState } from "react";

const EditTodo = ({ todo, onUpdate, onCancle }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/edittodo/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Types": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      if (!res.ok) throw new Error("Failed to update todo");
      const updateTodo = await res.json();
      onUpdate(updateTodo);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form className="mt-3 flex flex-col space-y-2" onSubmit={handleSubmit}>
        <input
          className="bg-gray-800 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-fray-500"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="bg-gray-800 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-fray-500"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-sm"
            type="submit"
          >
            Save
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-600 hover:bg-green-500 text-sm"
            type="button"
            onClick={onCancle}
          >
            Cancle
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
