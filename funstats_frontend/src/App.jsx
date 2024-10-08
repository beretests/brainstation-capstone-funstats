import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Header from "./components/Header/Header";
import StatsPage from "./pages/StatsPage/StatsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import AddStatPage from "./pages/AddStatPage/AddStatPage";
import { AuthProvider } from "./utils/authProvider";
import PrivateRoutes from "./utils/privateRoutes";

// const ThemeContext = createContext(null);

function App() {
  // const [theme, setTheme] = useState("light");
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/player/:id" element={<ProfilePage />} />
              <Route path="/player/:id/stats/:season" element={<StatsPage />} />
              <Route
                path="/player/:id/stats/:season/add"
                element={<AddStatPage />}
              />
              <Route
                path="/player/:id/stats/:season/compare/:friendId"
                element={<StatsPage />}
              />
              <Route path="/player/:id/friends" element={<FriendsPage />} />
            </Route>
            <Route path="/sign_up" element={<SignUpPage />} />
            <Route path="/sign_in" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
