import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import AllProductsPage from "./pages/allProductsPage";
import AddProductPage from "./pages/AddProductPage";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/products");
      console.log("API Response:", response.data); // Log the actual API response
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllProductsPage products={products} />} />
        <Route
          path="/product/:id"
          element={<ProductPage products={products} />}
        />
        <Route path="/add" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
