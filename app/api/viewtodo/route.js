import mongodb from "@/database";
import ToDo from "@/models/todoModel";

export async function GET(req) {
  try {
    await mongodb();
    const viewtodo = await ToDo.find();
    return new Response(JSON.stringify(viewtodo));
  } catch (error) {
    console.log(error);
  }
}
