const { Schema, models, model } = require("mongoose");

const todoModel = new Schema({
  title: String,
  description: String,
});

const ToDo = models.ToDo || model("ToDo", todoModel);

export default ToDo;
