import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Resetpassword from "./pages/resetpassword/Resetpassword";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword";
import Mainlayout from "./components/mainlayout/Mainlayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Enquiries from "./pages/enquries/Enquiries";
import Bloglist from "./pages/bloglist/Bloglist";
import Blogcategorylist from "./pages/bloglist/Blogcategorylist";
import Orders from "./pages/orders/Orders";
import Customers from "./pages/customers/Customers";
import Colorlist from "./pages/Catlogs/colors/Colorlist";
import Categorylist from "./pages/Catlogs/categories/Categorylist";
import Brandlist from "./pages/Catlogs/brands/Brandlist";
import Productlist from "./pages/Catlogs/products/Productlist";
import Addblog from "./pages/bloglist/addblog/Addblog";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<Mainlayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blogs" element={<Addblog />} />
          <Route path="blog-catgeory-list" element={<Blogcategorylist />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="product-list" element={<Productlist />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
