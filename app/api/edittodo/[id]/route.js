import mongodb from "@/database";
import ToDo from "@/models/todoModel";

export async function PUT(req, { params }) {
  await mongodb();
  const { id } = params;

  try {
    const { title, description } = await req.json();

    const edittodo = await ToDo.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true }
    );
    if (!edittodo) {
      return new Response(JSON.stringify("no todo found"));
    }
    return new Response(JSON.stringify(edittodo), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
