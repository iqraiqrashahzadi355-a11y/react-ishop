import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Features from "./components/Features";

// Product Pages
import Iphone from "./pages/Iphone";
import Ipad from "./pages/Ipad";
import Airpods from "./pages/Airpods";
import Macbook from "./pages/Macbook";
import AppleWatch from "./pages/AppleWatch";
import Imac from "./pages/Imac";
import AppleTv from "./pages/AppleTv";
import Entertainment from "./pages/Entertainment";
import Accessories from "./pages/Accessories";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import ManageProducts from "./pages/Admin/ManageProducts";
import AddProduct from "./pages/Admin/AddProduct";
import EditProduct from "./pages/Admin/EditProduct";
import ViewProduct from "./pages/Admin/ViewProduct";
import Messages from "./pages/Admin/Messages"; // ✅ New: Admin messages page

function LayoutWrapper() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ Hide Navbar for admin area */}
      {!hideLayout && <Navbar />}

      <Routes>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Products />
              <About />
              <Reviews />
              <Contact />
              <Features />
            </>
          }
        />

        {/* 📱 Product Pages */}
        <Route path="/iphone" element={<Iphone />} />
        <Route path="/ipad" element={<Ipad />} />
        <Route path="/airpods" element={<Airpods />} />
        <Route path="/macbook" element={<Macbook />} />
        <Route path="/applewatch" element={<AppleWatch />} />
        <Route path="/imac" element={<Imac />} />
        <Route path="/appletv" element={<AppleTv />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/accessories" element={<Accessories />} />

        {/* 🧭 Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/view-product/:id" element={<ViewProduct />} />

        {/* ✅ Nested Admin Routes */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="messages" element={<Messages />} /> {/* ✅ Added here */}
        </Route>
      </Routes>

      {/* ✅ Hide Footer for admin area */}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
