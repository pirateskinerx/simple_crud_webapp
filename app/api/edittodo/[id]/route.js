export async function PUT(req, { params }) {
  try {
    await mongodb();
    const { id } = params;
    const { title, description } = await req.json();

    const edittodo = await ToDo.findOneAndUpdate(
      { title, description },
      { new: true }
    );
    return new Response(JSON.stringify(edittodo));
  } catch (error) {
    console.log(error);
  }
}
