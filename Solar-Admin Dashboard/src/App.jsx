// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";
// import Enquiries from "./pages/Enquiries";
// import CmsPages from "./pages/CmsPages";
// import Users from "./pages/Users";
// import Settings from "./pages/Settings";
// import Products from "./pages/products/Products";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Applications from "./pages/Applications";
// import Jobs from "./pages/Jobs";
// import ProductCategory from "./pages/products/ProductCategory";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Admin Routes */}
//         <Route path="/admin" element={<Sidebar />}>
//           <Route index element={<Dashboard />} />
//           <Route path="enquiries" element={<Enquiries />} />
//           <Route path="products" element={<Products />} />
//           <Route path="productcategories" element={<ProductCategory />} />
//           <Route path="jobs" element={<Jobs />} />
//           <Route path="pages" element={<CmsPages />} />
//           <Route path="careers" element={<Applications />} />
//           <Route path="users" element={<Users />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import CmsPages from "./pages/CmsPages";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Products from "./pages/products/Products";
import Applications from "./pages/Applications";
import Jobs from "./pages/Jobs";
import ProductCategory from "./pages/products/ProductCategory";
import AdminLogin from "./components/adminlogin/AdminLogin";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes with Sidebar */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="products" element={<Products />} />
          <Route path="productcategories" element={<ProductCategory />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="pages" element={<CmsPages />} />
          <Route path="careers" element={<Applications />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Redirect root to admin login */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* 404 - Redirect to admin login */}
        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
