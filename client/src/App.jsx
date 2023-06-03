import { useState } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import Home from "./pages/index.jsx";
import AddTodo from "./pages/AddTodo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-todo" element={<AddTodo />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
