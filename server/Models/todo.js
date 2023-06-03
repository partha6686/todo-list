const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "active",
    enum: ["active", "inactive"],
  },
});

module.exports = mongoose.model("Todo", todoSchema);
