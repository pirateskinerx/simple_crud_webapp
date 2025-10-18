"use client";

import { useState } from "react";

const AddToDo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addtodo", {
        method: "POST",
        headers: { "Content-Types": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid p-30 pb-0 font-mono justify-center gap-7">
          <div className="flex gap-5">
            <input
              className="border-gray-600 border-t-0 border-r-0 border-l-0 p-1 border focus:outline-none"
              required
              type="text"
              placeholder="title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="bg-white text-black pl-3 pr-3" type="submit">
              add
            </button>
          </div>

          <input
            className="border-gray-600 border-t-0 border-r-0 border-l-0 p-1 border focus:outline-none"
            required
            type="text"
            placeholder="description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default AddToDo;
