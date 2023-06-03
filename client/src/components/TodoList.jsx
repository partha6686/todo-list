import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import dayjs from "dayjs";

const TodoList = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [realtodos, setRealTodos] = useState([]);

  const deleteTodo = async (id) => {
    const res = await fetch(`http://localhost:8000/todo/delete`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        id,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data?.success) {
      let temp = [...todos];
      temp = temp.filter((item) => item._id !== id);
      setTodos(temp);
      toast(data?.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Sorry! Some Error occured", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const fetchTodos = async () => {
    const res = await fetch(`http://localhost:8000/todo/get`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      mode: "cors",
    });

    const data = await res.json();
    if (data?.success) {
      setTodos(data?.todos);
      setRealTodos(data?.todos);
    } else {
      //TODO
    }
    setLoading(false);
  };

  const editTodo = async (todo) => {
    const res = await fetch(`http://localhost:8000/todo/update`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      mode: "cors",
      body: JSON.stringify(todo),
    });
    const data = await res.json();
    console.log(data);
    if (data?.success) {
      fetchTodos();
      toast(data?.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Sorry! Some Error Occured!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const setActiveTodos = async () => {
    let temp = [...realtodos];
    temp = temp.filter((item) => item.status === "active");
    setTodos(temp);
  };
  const setInactiveTodos = async () => {
    let temp = [...realtodos];
    temp = temp.filter((item) => item.status === "inactive");
    setTodos(temp);
  };
  const setTodayTodos = async () => {
    const today = new Date();
    let temp = [...realtodos];
    temp = temp.filter(
      (item) =>
        dayjs(item.dueDate).format("DD/MM/YYYY") ===
        dayjs(today).format("DD/MM/YYYY")
    );
    setTodos(temp);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <Navbar
        setActiveTodos={setActiveTodos}
        setInactiveTodos={setInactiveTodos}
        fetchTodos={fetchTodos}
        setTodayTodos={setTodayTodos}
      />
      <Container
        className="todo_container"
        maxWidth="xl"
        sx={{ height: "90vh" }}
      >
        {todos.length === 0 && (
          <Typography sx={{ textAlign: "center" }} variant="h5" component="div">
            No Tasks to do! Please Add tasks.
          </Typography>
        )}
        <Grid container spacing={2}>
          {todos?.map((item) => (
            <Grid item key={item._id} xs={12} md={6} lg={3}>
              <TodoCard
                todo={item}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TodoList;
