import mongodb from "@/database";
import ToDo from "@/models/todoModel";

export async function DELETE(req, { params }) {
  try {
    await mongodb();

    const { id } = params;

    const deletetodo = await ToDo.findOneAndDelete(id);
    return new Response(JSON.stringify(id));
  } catch (error) {
    console.log(error);
  }
}
