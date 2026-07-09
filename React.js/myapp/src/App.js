import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "../src/Components/signup";
import Login from "../src/Components/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
