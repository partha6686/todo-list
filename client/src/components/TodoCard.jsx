import React, { useState } from "react";
import "../styles/todo.css";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  Fab,
  FormControlLabel,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "./EditModal";

const TodoCard = ({ todo, deleteTodo, editTodo }) => {
  const [status, setStatus] = useState(
    todo?.status === "inactive" ? true : false
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const handleEditModal = () => {
    setEditModal(!editModal);
  };

  const handleStatus = async () => {
    const res = await fetch(`http://localhost:8000/todo/update`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        todoId: todo._id,
        status: todo?.status === "inactive" ? "active" : "inactive",
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data?.success) {
      setStatus(!status);
    } else {
      //   setAlert({ type: "error", msg: data?.error?.msg });
    }
  };
  return (
    <>
      <EditModal
        todo={todo}
        editModal={editModal}
        handleEditModal={handleEditModal}
        editTodo={editTodo}
      />
      <Dialog
        open={deleteModal}
        onClose={handleDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ border: "none" }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box
          sx={{
            p: {
              xs: 2,
              md: 4,
              borderRadius: "10px",
              backgroundColor: "#13192e",
            },
          }}
        >
          <DialogTitle sx={{ color: "#fff" }} id="alert-dialog-title">
            {"Are you sure you want to Delete?"}
          </DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#898989",
                ":hover": { backgroundColor: "#535353" },
              }}
              onClick={handleDeleteModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                deleteTodo(todo._id);
                handleDeleteModal();
              }}
              autoFocus
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
      <div className="todo_card">
        <FormControlLabel
          onClick={handleStatus}
          control={<Checkbox checked={status} />}
          label={
            <Typography variant="h5" component="div">
              {todo?.title}
            </Typography>
          }
        />

        <div className="hr"></div>
        <Typography
          sx={{ color: "#9b9da5", textAlign: "justify" }}
          variant="p"
          component="div"
        >
          {todo?.desc}
        </Typography>
        <div className="hr"></div>
        <Typography
          sx={{ color: "#ff242a", textAlign: "justify" }}
          variant="p"
          component="div"
        >
          {dayjs(todo?.dueDate).format("LLLL")}
        </Typography>
        <div className="todo_btn">
          <Fab sx={{ cursor: "pointer", mx: 1 }} onClick={handleEditModal}>
            <EditIcon />
          </Fab>
          <Fab sx={{ cursor: "pointer" }} onClick={handleDeleteModal}>
            <DeleteIcon />
          </Fab>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
