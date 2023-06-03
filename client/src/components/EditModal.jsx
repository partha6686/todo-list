import { Box, Button, Dialog, Stack } from "@mui/material";
import React, { useState } from "react";
import CssTextFeild from "./CssTextFeild";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const EditModal = ({ todo, editModal, handleEditModal, editTodo }) => {
  const [form, setForm] = useState({
    title: todo.title,
    desc: todo.desc,
    dueDate: todo.dueDate,
  });
  const [date, setDate] = useState(dayjs(todo.dueDate));
  const [alert, setAlert] = useState();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleDateChange = (newVal) => {
    console.log(newVal);
    setDate(newVal);
    setForm({ ...form, dueDate: dayjs(newVal.d).format("LLLL") });
  };
  return (
    <Dialog
      open={editModal}
      onClose={handleEditModal}
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
        <Stack spacing={4}>
          <div>
            <CssTextFeild
              name="title"
              value={form.title}
              onChange={(e) => handleChange(e)}
              id="outlined-title"
              label="Title"
              variant="outlined"
              fullWidth={true}
              inputProps={{
                style: { color: "white" },
              }}
            />
          </div>
          <div>
            <CssTextFeild
              name="desc"
              value={form.desc}
              onChange={(e) => handleChange(e)}
              id="outlined-desc"
              label="Description"
              variant="outlined"
              fullWidth={true}
              inputProps={{
                style: { color: "white" },
              }}
            />
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={date}
                onChange={(newVal) => handleDateChange(newVal)}
                label="Due Date"
                renderInput={(params) => (
                  <CssTextFeild
                    {...params}
                    fullWidth={true}
                    sx={{ width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <br />
          <Button
            variant="contained"
            onClick={() => {
              editTodo({ ...form, todoId: todo._id });
              handleEditModal();
            }}
          >
            Edit Todo
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default EditModal;
