import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Router/Login";
import Homepage from "./Router/Homepage";
import About from "./Router/About";
import NavBar from "./Router/Navbar";
import ProtectedRoutes from "./Router/ProtectedRoutes";
import Pagination from "./Pagination/Pagination";
function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
