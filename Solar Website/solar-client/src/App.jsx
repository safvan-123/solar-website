import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/SolarNavbar/AppNavbar.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/products/Products.jsx";
import Projects from "./pages/Projects.jsx";
import Careers from "./pages/careers/Careers.jsx";
import Brochure from "./pages/Brochure.jsx";
import AppFooter from "./components/AppFooter.jsx";
import Contact from "./pages/contacts/Contact.jsx";

function App() {
  console.log(import.meta.env.VITE_API_URL);

  return (
    <BrowserRouter>
      {/* Common Navbar */}
      <AppNavbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/projects" element={<Projects />} /> */}
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/brochure" element={<Brochure />} />
      </Routes>

      {/* Common Footer */}
      <AppFooter />
    </BrowserRouter>
  );
}

export default App;
