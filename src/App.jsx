import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import AllProductsPage from "./pages/allProductsPage";
import Papa from "papaparse";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/MOCK_DATA(1).csv") // Ensure the path is correct
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const formattedProducts = result.data.map((product) => ({
              id: product.id.toString(), // Ensure IDs are strings for comparison
              title: product.product_title,
              price: parseFloat(product.price),
              images: [product.image1, product.image2, product.image3].filter(
                Boolean
              ),
              color: product.color,
              department: product.department,
              description: product.description || "No description available",
            }));
            setProducts(formattedProducts);
          },
        });
      })
      .catch((error) => console.error("Error loading CSV:", error));
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
      </Routes>
    </Router>
  );
}

export default App;
