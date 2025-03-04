import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Papa from "papaparse";
import "../App.css";

function AllProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const images = [
    "http://dummyimage.com/112x148.png/ff4444/ffffff",
    "http://dummyimage.com/177x112.png/ff4444/ffffff",
    "http://dummyimage.com/201x147.png/5fa2dd/ffffff",
  ];
  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/products");
      console.log("API Response:", response.data); // Log the actual API response
      setAllProducts(response.data);
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

  useEffect(() => {
    let filtered = allProducts;

    if (selectedColor) {
      filtered = filtered.filter((product) => product.color === selectedColor);
    }

    if (selectedDepartment) {
      filtered = filtered.filter(
        (product) => product.department === selectedDepartment
      );
    }

    if (sortBy === "price-low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "alphabetical") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [selectedColor, selectedDepartment, sortBy, allProducts]);

  // Get unique color and department options
  const colorOptions = [...new Set(allProducts.map((p) => p.color))];
  const departmentOptions = [...new Set(allProducts.map((p) => p.department))];

  return (
    <>
      <div className="filterArea">
        <div>
          <label>
            Filter by Color:
            <select
              onChange={(e) => setSelectedColor(e.target.value)}
              value={selectedColor}
            >
              <option value="">All</option>
              {colorOptions.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
          <br></br>

          <label>
            Filter by Department:
            <select
              onChange={(e) => setSelectedDepartment(e.target.value)}
              value={selectedDepartment}
            >
              <option value="">All</option>
              {departmentOptions.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </label>
          <br></br>
          <label>
            Sort by:
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
              <option value="">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </label>
        </div>
        <div className="productArea">
          {filteredProducts.length === 0 ? (
            <p>Loading products...</p>
          ) : (
            filteredProducts.map((allProducts) => (
              <ProductCard
                key={allProducts.id}
                id={allProducts.id}
                images={images}
                title={allProducts.name}
                price={allProducts.price}
                color={allProducts.color}
                department={allProducts.department}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
export default AllProductsPage;
