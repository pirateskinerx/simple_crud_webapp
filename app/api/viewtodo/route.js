import mongodb from "@/database/index.js";
import Todo from "@/models/todoModel.js";

export async function GET(request) {
  try {
    await mongodb();
    const todos = await Todo.find().lean();
    return new Response(JSON.stringify(todos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/viewtodo error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
