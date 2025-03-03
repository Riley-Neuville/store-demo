import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Papa from "papaparse";
import "../App.css";

function AllProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [sortBy, setSortBy] = useState("");

  const loadAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products/");
      setAllProducts(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetch("MOCK_DATA(1).csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true, // Treat first row as headers
          skipEmptyLines: true,
          complete: (result) => {
            const formattedProducts = result.data.map((product) => ({
              id: product.id,
              title: product.product_title,
              price: parseFloat(product.price),
              images: [product.image1, product.image2, product.image3].filter(
                (img) => img // Remove empty image values
              ),
              color: product.color,
              department: product.department,
            }));
            setProducts(formattedProducts);
            setFilteredProducts(formattedProducts);
          },
        });
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  useEffect(() => {
    let filtered = products;

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
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(filtered);
  }, [selectedColor, selectedDepartment, sortBy, products]);

  // Get unique color and department options
  const colorOptions = [...new Set(products.map((p) => p.color))];
  const departmentOptions = [...new Set(products.map((p) => p.department))];

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
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                images={product.images}
                title={product.title}
                price={product.price}
                color={product.color}
                department={product.department}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
export default AllProductsPage;
