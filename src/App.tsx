import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
