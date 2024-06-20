import logo from "./logo.svg";
import "./App.css";
import { Provider, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material";
import SingleProduct from "./components/SingleProduct";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;


