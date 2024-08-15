import { useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import StatsPage from "./pages/StatsPage/StatsPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/player/:id" element={<ProfilePage />} />
          <Route path="/player/:id/stats" element={<StatsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
