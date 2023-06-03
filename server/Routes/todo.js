const router = require("express").Router();
const {
  postTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../Controllers/todo");
const { body } = require("express-validator");

router.get("/get", getTodo);
router.put("/update", updateTodo);
router.delete("/delete", deleteTodo);
router.post(
  "/post",
  [
    body("title", "Title must have atleast 3 charecters").isLength({ min: 3 }),
    body("desc", "Description must have atleast 5 charecters").isLength({
      min: 5,
    }),
    body("dueDate", "Please enter a due date").notEmpty(),
  ],
  postTodo
);

module.exports = router;
