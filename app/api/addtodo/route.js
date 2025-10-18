import mongodb from "@/database";
import ToDo from "@/models/todoModel";

export async function POST(req) {
  try {
    const { title, description } = await req.json();
    await mongodb();

    const todo = await ToDo.create({
      title,
      description,
    });
    return new Response(JSON.stringify(todo));
  } catch (error) {
    console.log(error);
  }
}
