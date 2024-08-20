import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import StatsPage from "./pages/StatsPage/StatsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const id = sessionStorage.getItem("userId");

  return (
    <>
      <BrowserRouter>
        <Header id={id} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/player/:id"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/player/:id/stats"
            element={
              <PrivateRoute>
                <StatsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/player/:id/stats/compare/:friendId"
            element={
              <PrivateRoute>
                <StatsPage />
              </PrivateRoute>
            }
          />
          <Route path="/sign_up" element={<SignUpPage />} />
          <Route path="/sign_in" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
