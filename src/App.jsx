import Navbar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wishlist from "./pages/Wishlist";
import NoItemsMessage from "./components/NoItemsMessage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import Order from "./pages/Order";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route
            path="/productdetails/:productId"
            element={<ProductDetails />}
          />
          <Route path="/categories/:category" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <NoItemsMessage text="Unfortunately the page you are looking for has been moved or deleted" />
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/order" element={<Order />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
