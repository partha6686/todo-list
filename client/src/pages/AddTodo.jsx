import {
  Alert,
  Box,
  Button,
  Container,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useState } from "react";
import "../styles/form.css";
import CssTextFeild from "../components/CssTextFeild";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const AddTodo = () => {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    dueDate: "",
  });
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleDateChange = (newVal) => {
    console.log(newVal);
    console.log(dayjs(newVal).format("LLLL"));
    setDate(newVal);
    setForm({ ...form, dueDate: dayjs(newVal).format("LLLL") });
  };
  const handleSubmit = async () => {
    console.log(form);
    if (form.title && form.desc && form.dueDate) {
      const res = await fetch(`http://localhost:8000/todo/post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          title: form.title,
          desc: form.desc,
          dueDate: form.dueDate,
        }),
      });
      const data = await res.json();
      console.log(data);

      if (data?.success) {
        setAlert({ type: "success", msg: data.message });
        setForm({
          title: "",
          desc: "",
          dueDate: "",
        });
      } else {
        setAlert({ type: "error", msg: data?.error?.msg });
      }
    }
  };
  return (
    <>
      <div className="navbar">
        <div className="nav_head">
          <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
            <Typography variant="h2" component="div">
              TODO!
            </Typography>
          </Link>
        </div>
      </div>
      {/*<Navbar />*/}
      <Container maxWidth="lg" sx={{ height: "90vh" }}>
        <div className="form_container">
          {alert && (
            <Alert sx={{ my: 2 }} severity={alert?.type}>
              {alert?.msg}
            </Alert>
          )}
          <div className="add_card">
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
              <div className="submit_btn" onClick={handleSubmit}>
                <AddIcon fontSize="large" />
              </div>
            </Stack>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AddTodo;
