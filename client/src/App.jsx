import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./component/Pages/HomePage/Home";
import SingUp from "./component/Pages/SingUp";
import Login from "./component/Pages/Login";
import Profile from "./component/Pages/Profile";
import { useAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";
import { Box } from "@chakra-ui/react";
import ChatHome from "./component/Pages/HomePage/ChatHome";
import { useMessageStore } from "../store/MessageStore";
import Info from "./component/Pages/HomePage/Info";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {selectedUser} = useMessageStore()

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
        <Box className="min-h-screen bg-black flex justify-center items-center">
          <div>
            <Loader className="size-20 animate-spin" />
          </div>
        </Box>
    );
  }
  return (
      <Box className="min-h-screen bg-black  ">
        <BrowserRouter>
        {authUser && !isCheckingAuth && <Info />}
          <Routes>
            <Route
              path="/"
              element={
                authUser && !isCheckingAuth ? (
                  <Home />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/singup"
              element={
                !authUser && !isCheckingAuth ? <SingUp /> : <Navigate to="/" />
              }
            />
            <Route
              path="/login"
              element={
                !authUser && !isCheckingAuth ? <Login /> : <Navigate to="/" />
              }
            />
            <Route
              path="/profile"
              element={
                authUser && !isCheckingAuth ? (
                  <Profile />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/message"
              element={
                !isCheckingAuth && authUser && selectedUser !== null ? (
                  <ChatHome />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </Box>
  );
}

export default App;
