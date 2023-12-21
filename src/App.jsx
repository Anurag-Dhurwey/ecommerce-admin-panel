import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Resetpassword from "./pages/resetpassword/Resetpassword";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword";
import Mainlayout from "./components/mainlayout/Mainlayout";
import Dashboard from "./pages/dashboard/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<Mainlayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
