const Todo = require("../Models/todo");
const { validationResult } = require("express-validator");

const postTodo = async (req, res) => {
  const { title, desc, dueDate } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors.array()[0] });
  }
  try {
    const data = await Todo.create({
      title,
      desc,
      dueDate,
    });

    return res.json({
      success: true,
      message: "To-do added successfully",
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.json({
      success: true,
      message: "TODOs fetched successfully",
      todos,
    });
  } catch (error) {
    res.json({ error, success: false });
  }
};

const updateTodo = async (req, res) => {
  const {
    todoId,
    title = null,
    desc = null,
    dueDate = null,
    status = null,
  } = req.body;
  try {
    let updatedNote = {};
    if (title) {
      updatedNote.title = title;
    }
    if (desc) {
      updatedNote.desc = desc;
    }
    if (dueDate) {
      updatedNote.dueDate = dueDate;
    }
    if (status) {
      updatedNote.status = status;
    }
    const todo = await Todo.findById(todoId);

    if (todo) {
      const data = await Todo.findByIdAndUpdate(todoId, updatedNote);
      res.json({ success: true, message: "Todo updated Successfully" });
    } else {
      res.json({ success: false, message: "No Todo Found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, error });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await Todo.findOneAndDelete({ _id: id });
    return res.json({ success: true, message: "Todo Deleted Successfully" });
  } catch (error) {
    return res.json({
      success: false,
      error,
    });
  }
};

module.exports = {
  postTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};
