import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function AddProductPage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    color: "",
    department: "",
  });

  const handleAddProduct = async () => {
    try {
      console.log("Sending product data:", newProduct);

      // Make sure you're using the exact same URL path as defined in your controller
      const response = await axios.post(
        "http://localhost:8080/api/createResource",
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
            // Remove any other headers that might be causing issues
          },
          withCredentials: true, // Keep this if you're using authentication
        }
      );

      console.log("Response received:", response.data);
      // Handle success response
    } catch (error) {
      // More detailed error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", {
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up request:", error.message);
      }
    }
  };

  return (
    <div className="AddProductPage">
      <input
        type="text"
        placeholder="Add Product Name"
        style={{ width: "75%", marginRight: "10px" }}
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Add Product Price"
        style={{ width: "75%", marginRight: "10px" }}
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Add Product Color"
        style={{ width: "75%", marginRight: "10px" }}
        value={newProduct.color}
        onChange={(e) =>
          setNewProduct({ ...newProduct, color: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Add Product Department"
        style={{ width: "75%", marginRight: "10px" }}
        value={newProduct.department}
        onChange={(e) =>
          setNewProduct({ ...newProduct, department: e.target.value })
        }
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default AddProductPage;
