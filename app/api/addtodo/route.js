import mongodb from "@/database/index.js";
import Todo from "@/models/todoModel.js";

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description } = body || {};
    if (!title) {
      return new Response(JSON.stringify({ error: "title is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await mongodb();
    const todo = await Todo.create({ title, description });
    return new Response(JSON.stringify(todo), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("POST /api/addtodo error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
