import mongodb from "@/database/index.js";
import Todo from "@/models/todoModel.js";

export async function DELETE(request) {
  try {
    // try parse JSON body (may be empty)
    let body = null;
    try { body = await request.json(); } catch (_) { body = null; }

    const url = new URL(request.url);
    const idFromBody = body?.id;
    const idFromQuery = url.searchParams.get("id");

    // extract last path segment if it's not the route name (supports /api/deletetodo/<id>)
    const pathSegments = url.pathname.split("/").filter(Boolean);
    let idFromPath = null;
    const lastSeg = pathSegments[pathSegments.length - 1];
    if (lastSeg && lastSeg.toLowerCase() !== "deletetodo" && lastSeg.toLowerCase() !== "api") {
      idFromPath = lastSeg;
    }

    const id = idFromBody || idFromQuery || idFromPath;
    if (!id) {
      return new Response(JSON.stringify({ error: "id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await mongodb();
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "todo not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("DELETE /api/deletetodo error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
