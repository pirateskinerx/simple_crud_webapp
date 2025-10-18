import mongodb from "@/database/index.js";
import Todo from "@/models/todoModel.js";

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, description } = body || {};
    if (!id) {
      return new Response(JSON.stringify({ error: "id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!title && description === undefined) {
      return new Response(JSON.stringify({ error: "nothing to update" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await mongodb();
    const update = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;

    const updated = await Todo.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!updated) {
      return new Response(JSON.stringify({ error: "todo not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("PUT /api/edittodo error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
